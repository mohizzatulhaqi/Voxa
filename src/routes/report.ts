import { Router } from "express"
import {
  createReport,
  getUserReports,
  getReportDetail,
  getCategories,
  getAllReports,
  updateReportStatus,
} from "../controllers/reportController"
import { authenticateToken, isAdmin } from "../middleware/auth"
import { upload } from "../middleware/upload"

const router = Router()

router.get("/categories", authenticateToken, getCategories)
router.post("/", authenticateToken, upload.array("files", 5), createReport)
router.get("/", authenticateToken, getUserReports)
router.get("/admin", authenticateToken, isAdmin, getAllReports)
router.get("/:id", authenticateToken, getReportDetail)
router.patch("/:id/status", authenticateToken, isAdmin, updateReportStatus)

export default router
