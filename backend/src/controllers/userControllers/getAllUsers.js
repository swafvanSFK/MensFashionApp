import userModel from "../../models/userModel.js"

const getAllUsersController = async (req,res) => {
    const allUsers = await userModel.find()
    res.status(200).send({message : "Get all users successfully",success : true , error : false, data : allUsers})
}

export default getAllUsersController