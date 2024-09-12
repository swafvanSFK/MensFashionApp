import Jwt from "jsonwebtoken";
import serverConfig from "../config/serverConfig.js";

const authUser = async (req, res, next) => {

  const token = req?.cookies?.token;  

  if (!token) {
    return res.status(401).send("Token must be provided");
  }

  Jwt.verify(token, serverConfig.jwt_key, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(403).send("Not verified");
    }
    
    req.user = user;

    next();
  });
};

export default authUser;
