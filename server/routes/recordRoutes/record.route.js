import express from 'express'
import {createRecord, getRecords, updateRecord, deleteRecord} from '../../controller/record.controller.js'
import {authMiddleware} from '../../middleware/authMiddleware.js'
import { authorized } from '../../middleware/roleMiddleware.js';
const router = express.Router();

router.post("/", authMiddleware, authorized("admin"),  createRecord)
router.get("/", authMiddleware, authorized("viewer", "analyst", "admin"), getRecords)
router.put("/:id/update", authMiddleware, authorized("admin"), updateRecord)
router.delete("/:id/delete", authMiddleware, authorized("admin"), deleteRecord)

export default router