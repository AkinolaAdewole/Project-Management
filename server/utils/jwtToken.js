export const sendToken = (message, user, res, statusCode) => {
  const token = user.getJWTToken(); 
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true, 
    secure: process.env.NODE_ENV === "production", 
    sameSite: "Strict",
  };

  res.status(statusCode).cookie("token", token, cookieOptions).json({
    success: true,
    user, 
    message,
  });
};



// const jwt = require('jsonwebtoken');

// export const sendToken = (message, user, res, statusCode) => {
//   const token = user.getJWTToken();
//   const options = {
//     expires: new Date(
//       Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
//     ),
//     httpOnly: true,
//   };
//   res.status(statusCode).cookie("token", token, options).json({
//     success: true,
//     user,
//     message,
//     token,
//   });
// };
