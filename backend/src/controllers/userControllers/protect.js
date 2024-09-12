import UserModel from "../../models/userModel.js";


const protectController = async (req,res) => {
    
  const userId = req.user.data._id;

  const user = await UserModel.findById(userId);

  res.status(200).send({
    message: "User details",
    data: user,
    error: false,
    success: true,
  });
}

export default protectController