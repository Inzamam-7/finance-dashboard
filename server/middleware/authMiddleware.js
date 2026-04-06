import { verifyToken } from "../helpers/jwtHelper.js";
import { asyncHandler } from "./asyncHandler.js";
import AppError from "../helpers/AppError.js";

export const authMiddleware = asyncHandler(async (req, res, next) => {
  let token;
  
  if (req.cookies?.token) {
    token = req.cookies.token;
  }

  else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }  

  if (!token) {
    throw new AppError("Unauthorized access", 401);
  }

  const decoded = verifyToken(token);

  req.user = decoded;

  next();
});
