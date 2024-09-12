import userModel from "../../models/userModel.js";

const getUserByIdController = async (req, res) => {

  const userId = req.user.data._id;  
  const id = req.params.id

  const user = await userModel.findById(userId);
  const userById = await userModel.findById( id);

  res.status(200).send({
    message: "User details",
    data: user,
    byId :userById,
    error: false,
    success: true,
  });
};

export default getUserByIdController;
