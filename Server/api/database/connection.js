import mongoose from "mongoose";

// ******************************
// mongoose connect
// ******************************
const uri = process.env.MONGOOSE_URL;
// const uri = "mongodb://localhost:27017/PORTFOLIO";
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
