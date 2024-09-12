import jwt from "jsonwebtoken";
import serverConfig from "../config/serverConfig.js";

const generateToken = (userName) => {
    
  const secretKey = serverConfig.jwt_key;

  return jwt.sign({ data: userName }, secretKey, { expiresIn: "1d" });
};

export default generateToken;
