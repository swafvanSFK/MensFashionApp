import UserModel from '../../models/userModel.js'
import userModel from '../../models/userModel.js'
import generateToken from '../../utils/generateToken.js'
import bcrypt from 'bcryptjs'


const loginWithGoogle = async (req, res) => {
    
    const {email, name} = req.body

    const user = await userModel.findOne({email})

    if(user) {
        const token = generateToken(user)
        res.cookie("token", token,{httpOnly:true, sameSite:'None', secure:true});
        res.status(201).json({
            message: "Loggin successfully",
            error: false,
            success: true,
          });
    }else {

        const generatePassword = 
            Math.random().toString(36).slice(-8) +
            Math.random().toString(36).slice(-8);

        const hashedPassword = await bcrypt.hash(generatePassword,10)

        const newUser = new UserModel({
            userName: name,
            email : email,
            password : hashedPassword,
            role : "GENERAL"
        })

        await newUser.save()

        const token = generateToken(user)
        res.cookie("token", token,{httpOnly:true, sameSite:'None', secure:true});

        return res.status(200).json({message : "Login succesfully",success : true})
    }

}

export default loginWithGoogle