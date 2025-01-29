import mongoose from "mongoose";
import { MONGOOSE_URL } from "../../config.js";

// ******************************
// mongoose connect
// ******************************
const uri = MONGOOSE_URL;

export default function () {
  mongoose
    .connect(uri)
    .then(() => {
      console.log("Database Connacted...");
    })
    .catch((error) => {
      console.log(error);
    });
}
