import { customErrorHandel } from "../utils/customErrorHandel.js";

// login admin plane for admin
export const adminlogin = (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (process.env.EMAIL !== email || process.env.PASSWORD !== password)
      return next(customErrorHandel(402, "invalid credentials"));

    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: "login suscess",
    });
  } catch (error) {
    return next(customErrorHandel());
  }
}; 