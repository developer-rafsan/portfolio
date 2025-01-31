import { ALLOW_IP } from "../../config.js";
import { customErrorHandel } from "../utils/customErrorHandel.js";

export const deviceAuth = (req, res, next) => {
  let USER_IP = req.ip;

  console.log(USER_IP);
  console.log("::ffff:" + USER_IP);
  console.log(ALLOW_IP);
  console.log(ALLOW_IP !== "::ffff:" + USER_IP);

  res.status(200).json({
    success: false,
    USER_IP,
    ALLOW_IP
  });
  
  if (ALLOW_IP !== USER_IP && ALLOW_IP !== "::ffff:" + USER_IP)
    return next(customErrorHandel(404, "user not auth"));

  next();
};
