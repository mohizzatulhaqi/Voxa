import type { Response } from "express"
import { pool } from "../config/database"
import type { AuthRequest } from "../middleware/auth"

export const getPublicStats = async (req: AuthRequest, res: Response) => {
  try {
    const [totalReportsResult] = await pool.execute("SELECT COUNT(*) as total_reports FROM reports")
    const totalReports = (totalReportsResult as any[])[0].total_reports

    res.json({
      success: true,
      data: {
        total_reports: totalReports,
      },
    })
  } catch (error) {
    console.error("Public stats error:", error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
}

export const getDashboardStats = async (req: AuthRequest, res: Response) => {
  try {
    // Get total reports count
    const [totalReportsResult] = await pool.execute("SELECT COUNT(*) as total_reports FROM reports")
    const totalReports = (totalReportsResult as any[])[0].total_reports

    // Get reports by status
    const [statusResult] = await pool.execute(`
      SELECT 
        status,
        COUNT(*) as count
      FROM reports 
      GROUP BY status
    `)

    // Get recent reports (last 7 days)
    const [recentReportsResult] = await pool.execute(`
      SELECT COUNT(*) as recent_reports 
      FROM reports 
      WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
    `)
    const recentReports = (recentReportsResult as any[])[0].recent_reports

    // Get user's reports count if authenticated
    let userReports = 0
    if (req.user) {
      const [userReportsResult] = await pool.execute("SELECT COUNT(*) as user_reports FROM reports WHERE user_id = ?", [
        req.user.id,
      ])
      userReports = (userReportsResult as any[])[0].user_reports
    }

    const statusCounts = (statusResult as any[]).reduce((acc, curr) => {
      acc[curr.status] = curr.count
      return acc
    }, {})

    res.json({
      success: true,
      data: {
        total_reports: totalReports,
        recent_reports: recentReports,
        user_reports: userReports,
        status_breakdown: {
          menunggu: statusCounts.menunggu || 0,
          proses: statusCounts.proses || 0,
          selesai: statusCounts.selesai || 0,
        },
      },
    })
  } catch (error) {
    console.error("Dashboard stats error:", error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
}
