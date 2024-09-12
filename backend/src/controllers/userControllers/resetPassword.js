import jwt from 'jsonwebtoken'
import UserModel from '../../models/userModel';
import bycrypt from 'bcryptjs'

export const resetPassword = async (req, res) => {

      const decodedToken = jwt.verify(
        req.params.token,
        process.env.JWT_SECRET_KEY
      );
  
      if (!decodedToken) {
        return res.status(401).send({ message: "Invalid token" });
      }
  
      const user = await UserModel.findOne({ _id: decodedToken.userId });
      
      if (!user) {
        return res.status(401).send({ message: "no user found" });
      }
      
      req.body.newPassword = await bycrypt.hash(req.body.newPassword, 10);
  
      user.password = req.body.newPassword;
      await user.save();
  
      res.status(200).send({ message: "Password updated successfully" });
    
  };