import AppError from '../helpers/AppError.js'
import User from "../models/user.models.js";

// 🔹 Create User
export const createUser = async (data) => {
  const { name, email, password, role } = data;

  if (!name || !email || !password) {
    throw new AppError("Name, email and password are required", 400);
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError("User already exists", 400);
  }

  const user = await User.create({
    name,
    email,
    password,
    role, 
  });

  user.password = undefined;
  return user;
};

export const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};



// 🔹 Get All Users
export const getAllUsers = async () => {
  const users = await User.find().select("-password");

  return users;
};



// 🔹 Get Single User
export const getUserById = async (userId) => {
  
  const user = await User.findById(userId).select("-password");

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return user;
};



// 🔹 Update User Role
export const updateUserRole = async (userId, role) => {
  const allowedRoles = ["viewer", "analyst", "admin"];

  if (!allowedRoles.includes(role)) {
    throw new AppError("Invalid role", 400);
  }

  const user = await User.findById(userId);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  user.role = role;
  await user.save();

  user.password = undefined;

  return user;
};



// 🔹 Update User Status
export const updateUserStatus = async (userId, status) => {
  const allowedStatus = ["active", "inactive"];

  if (!allowedStatus.includes(status)) {
    throw new AppError("Invalid status", 400);
  }

  const user = await User.findById(userId);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  user.status = status;
  await user.save();

  user.password = undefined;

  return user;
};



// 🔹 Delete User (Hard Delete)
export const deleteUser = async (userId) => {
  
  const user = await User.findByIdAndDelete(userId);
  
  if (!user) {
    throw new AppError("User not found", 404);
  }
  

  return user;
};