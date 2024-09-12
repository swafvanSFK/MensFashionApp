import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import serverConfig from "../config/serverConfig.js";

dotenv.config();

function authAdmin (req, res, next) {
  
  const token = req.cookies.token;

  jwt.verify(token, serverConfig.jwt_key, (err, user) => {

    if (err) return res.sendStatus(403);

    req.user = user;
    
    const role = req?.user?.data?.role

    console.log("role",role);

    if (role !== "ADMIN") {
      return res.json({message : "not authenticated"});
    }

    next();

  });
}

export default authAdmin;