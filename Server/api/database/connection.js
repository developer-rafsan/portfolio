import mongoose from "mongoose";

// ******************************
// mongoose connect
// ******************************
const uri = process.env.MONGOOSE_URL;
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
