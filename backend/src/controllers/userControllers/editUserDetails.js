import userModel from "../../models/userModel.js";

const editUserDetailsController = async (req, res) => {
  const userId = req.user.data._id;
  const data = req.body;

  const userData = await userModel.findByIdAndUpdate(userId, data, {
    new: true,
  });

  if (!userData) {
    return res.status(400).json({ message: "User not found" });
  }
  res
    .status(200)
    .json({
      message: "Profile updated successfully",
      data: userData,
      success: true,
    });
};

export default editUserDetailsController;
