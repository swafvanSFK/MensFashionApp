import { loginJoi } from "../../validations/userJoiValidation.js";
import userModel from "../../models/userModel.js";
import generateToken from "../../utils/generateToken.js";
import bcrypt from "bcryptjs";

const signInController = async (req, res) => {
  const {error} = await loginJoi.validateAsync(req.body)
    if(error){
        console.error('Validation error:', error.details[0].message);
        return res.status(400).json({ error: error.details[0].message });
    }

  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(400).json({
      message: "User not found",
      success : false
    });
  }

  const matchPassword = await bcrypt.compareSync(password, user.password);

  if (!matchPassword) {
    return res.status(401).json({message:"Incorrect password",success : false});
  }

  const token = generateToken(user);  

  
  
  res.cookie("token", token,{httpOnly:true, sameSite:'None', secure:true});
  res.status(201).json({
    message: "Loggin successfully",
    error: false,
    success: true,
  });
};

export default signInController;
