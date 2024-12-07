// 

import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken";
import { User } from "../models/userSchema.js";
import { catchAsyncErrors } from "./catchAsyncErrors.js";

// Ensure you are using cookie-parser in your app
// Example: app.use(cookieParser());

export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  // Ensure cookies are being parsed properly
  const { token } = req.cookies;

  // If token doesn't exist, return a 401 Unauthorized status
  if (!token) {
    return next(new ErrorHandler("User is not authenticated!", 401));
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Find the user by decoded ID
    req.user = await User.findById(decoded.id);

    if (!req.user) {
      return next(new ErrorHandler("User not found!", 404));
    }

    next(); // Proceed if the user is authenticated
  } catch (error) {
    // If token is invalid or expired, send an appropriate response
    return next(new ErrorHandler("Invalid or expired token!", 401));
  }
});
