import {asyncHandler} from '../middleware/asyncHandler.js'
import * as userService from '../services/userService.js';
import { successResponse } from "../helpers/responseHandler.js";
import AppError from "../helpers/AppError.js";
import { generateToken } from '../helpers/jwtHelper.js';
import { setCookies} from '../helpers/cookieHelper.js'

//  Create User (Admin)
export const createUser = asyncHandler(async (req, res) => {
  const user = await userService.createUser(req.body);

  return successResponse(res, user, "User created successfully");
});

// login User
export const loginUser = asyncHandler(async(req,res) =>{
  const { email, password} = req.body;

  if(!email || !password){
    throw new AppError("Email and password are requied", 400);
  }

  const user = await userService.findUserByEmail(email)

  if(!user){
    throw new AppError("User not found", 404);
  }

  const isMatched = await user.comparePassword(password)

  if(!isMatched){
    throw new AppError("Invalid credentials", 401)
  }

  const token = generateToken({id:user._id, role:user.role})

  setCookies(res,token)

  return successResponse(
  res,
  {
    data: {
      id: user._id,
      email: user.email,
      role: user.role,
    },
    statusCode:200,
    message:"Login successful"
  }
);
})


//  Get All Users (Admin)
export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await userService.getAllUsers();

  return successResponse(res, {data: users, statusCode:200 , message:"User fetched successfully"});
});


//  Get Single User (Admin)
export const getUserById = asyncHandler(async (req, res) => {
  console.log(`yeh user id h ${req.params.id}`);
  
  const user = await userService.getUserById(req.params.id);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return successResponse(res, {data: user, statusCode:200 , message:"User fetched successfully"});
});


//  Update User Role (Admin)
export const updateUserRole = asyncHandler(async (req, res) => {
  const { role } = req.body;

  if (!role) {
    throw new AppError("Role is required", 400);
  }

  const updatedUser = await userService.updateUserRole(
    req.params.id,
    role
  );

  return successResponse(res, {data: updatedUser, statusCode:200 , message:"User role updated successfully"});
});


//  Update User Status (Admin)
export const updateUserStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  if (!status) {
    throw new AppError("Status is required", 400);
  }

  const updatedUser = await userService.updateUserStatus(
    req.params.id,
    status
  );

  return successResponse(res, {data: updatedUser, statusCode:200 , message:"User status updated successfully"});
});


//  Delete User (Optional - Admin)
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await userService.deleteUser(req.params.id);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return successResponse(res, {data:null, statusCode:200, message:"User deleted successfully"});
});