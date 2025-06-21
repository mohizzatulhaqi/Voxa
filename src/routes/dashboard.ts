import { Router } from "express"
import { getDashboardStats, getPublicStats } from "../controllers/dashboardController"
import { authenticateToken } from "../middleware/auth"

const router = Router()

// @route   GET /api/dashboard/stats
// @desc    Get dashboard statistics (Private)
router.get("/stats", authenticateToken, getDashboardStats)

// @route   GET /api/dashboard/public-stats
// @desc    Get public statistics (Public)
router.get("/public-stats", getPublicStats)

export default router
