import { ALLOW_IP } from "../../config.js";
import { customErrorHandel } from "../utils/customErrorHandel.js";

export const deviceAuth = async (req, res, next) => {
  const USER_IP = req.headers.authorization;  

  if (!ALLOW_IP || !USER_IP || ALLOW_IP !== USER_IP)
    return next(customErrorHandel(404, "user not auth"));

  next();
};
