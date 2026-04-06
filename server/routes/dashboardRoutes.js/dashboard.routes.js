import express from 'express'
import { getSummary, getCategoryTotals, getMonthlyTrends } from '../../controller/dashboard.controller.js'
import { authMiddleware } from '../../middleware/authMiddleware.js'
import { authorized } from '../../middleware/roleMiddleware.js'
const router = express.Router();

router.get("/summary", authMiddleware, authorized("viewer", "analyst", "admin"), getSummary)
router.get("/categories", authMiddleware, authorized("viewer", "analyst", "admin"), getCategoryTotals)
router.get("/trends", authMiddleware, authorized("viewer", "analyst", "admin"), getMonthlyTrends)

export default router