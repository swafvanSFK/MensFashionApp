import mongoose from "mongoose";
import serverConfig from "./serverConfig.js";

const dbConnect = async () => {
  await mongoose.connect(serverConfig.db);
};

export default dbConnect;
