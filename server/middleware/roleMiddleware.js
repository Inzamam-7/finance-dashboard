import AppError from "../helpers/AppError.js";

export const authorized = (...roles) =>{
   return (req,res,next) =>{
   
    if(!roles.includes(req.user.role)){
        throw new AppError("Forbidden Access", 403)
    }
    next();
   }
}