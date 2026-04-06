import { createUser, getAllUsers, getUserById, updateUserRole, updateUserStatus, deleteUser, loginUser } from "../../controller/user.controller.js";
import express from 'express'
const router = express.Router();

router.post("/", createUser)
router.post("/login", loginUser)
router.get("/:id", getUserById)
router.get("/", getAllUsers)
router.put("/:id/role", updateUserRole)
router.put("/:id/status", updateUserStatus)
router.delete("/:id", deleteUser)

export default router