import mongoose from "mongoose";

// ******************************
// mongoose connect
// ******************************
const uri = 'mongodb+srv://developer-rafsanx:rafsanx@portfolio.fi6xvnc.mongodb.net/Portfolio-Database?retryWrites=true&w=majority&appName=portfolio';

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
