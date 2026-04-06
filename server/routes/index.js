import userRoutes from './userRoutes/user.routes.js'
import recordRoutes from './recordRoutes/record.route.js';
import dashboardRoutes from './dashboardRoutes.js/dashboard.routes.js'
import express from 'express'

const router = express.Router();

router.use("/users", userRoutes)
router.use("/records", recordRoutes)
router.use("/dashboard", dashboardRoutes)

export default router