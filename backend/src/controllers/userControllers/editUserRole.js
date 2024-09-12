import userModel from "../../models/userModel.js"

const editUserRoleController = async (req, res) => {
    const id = req.params.id
    const newUserData = req.body

    const userData = await userModel.findByIdAndUpdate(id,newUserData,{new:true})

    if(!userData){
        res.status(400).json({message : "User not found"})
    }
    res.status(200).json({message : "User updated successfully",data : userData})

}

export default editUserRoleController