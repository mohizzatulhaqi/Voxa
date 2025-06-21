import type { Response } from "express";
import { pool } from "../config/database";
import type { AuthRequest } from "../middleware/auth";
import type { CreateReportRequest } from "../types";
import fs from "fs";
import type { Express } from "express";

// ✅ Create Report
export const createReport = async (req: AuthRequest, res: Response): Promise<void> => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const {
      incident_description,
      incident_time,
      category_id,
      incident_location,
      incident_date,
      violation_description,
    }: CreateReportRequest = req.body;

    if (
      !incident_description ||
      !incident_time ||
      !category_id ||
      !incident_location ||
      !incident_date ||
      !violation_description
    ) {
      res.status(400).json({ success: false, message: "All fields are required" });
      return;
    }

    const [reportResult] = await connection.execute(
      `
      INSERT INTO reports (
        user_id, incident_description, incident_time, category_id,
        incident_location, incident_date, violation_description
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `,
      [
        req.user!.id,
        incident_description,
        incident_time,
        category_id,
        incident_location,
        incident_date,
        violation_description,
      ]
    );

    const reportId = (reportResult as any).insertId;
    console.log("Report created with ID:", reportId);

    const files = req.files as Express.Multer.File[];
    console.log("Files received:", files?.length || 0);
    if (files && files.length > 0) {
      for (const file of files) {
        console.log("Processing file:", file.originalname, "Path:", file.path);
        console.log("File exists on disk:", fs.existsSync(file.path));
        console.log("File size on disk:", fs.statSync(file.path).size);
        
        let fileType: "image" | "video" | "audio";

        if (file.mimetype.startsWith("image/")) fileType = "image";
        else if (file.mimetype.startsWith("video/")) fileType = "video";
        else if (file.mimetype.startsWith("audio/")) fileType = "audio";
        else continue;

        const normalizedPath = file.path.replace(/\\/g, '/');
        console.log("Normalized path for database:", normalizedPath);

        await connection.execute(
          `
          INSERT INTO report_files (
            report_id, file_name, file_path, file_type, file_size, mime_type
          ) VALUES (?, ?, ?, ?, ?, ?)
        `,
          [reportId, file.originalname, normalizedPath, fileType, file.size, file.mimetype]
        );
        console.log("File saved to database:", file.originalname);
      }
    }

    await connection.commit();
    res.status(201).json({ success: true, message: "Report created", data: { report_id: reportId } });
  } catch (error) {
    await connection.rollback();
    const files = req.files as Express.Multer.File[];
    if (files) {
      files.forEach((file) => {
        if (fs.existsSync(file.path)) fs.unlinkSync(file.path);
      });
    }
    console.error("Create report error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  } finally {
    connection.release();
  }
};

// ✅ Get All Reports (for current user)
export const getUserReports = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM reports WHERE user_id = ? ORDER BY created_at DESC",
      [req.user!.id]
    );
    res.status(200).json({ success: true, data: rows });
  } catch (error) {
    console.error("Get reports error:", error);
    res.status(500).json({ success: false, message: "Failed to get reports" });
  }
};

// ✅ Get Detail Report
export const getReportDetail = async (req: AuthRequest, res: Response): Promise<void> => {
  const reportId = req.params.id;
  try {
    const [reports] = await pool.query("SELECT * FROM reports WHERE id = ? AND user_id = ?", [
      reportId,
      req.user!.id,
    ]);

    if ((reports as any[]).length === 0) {
      res.status(404).json({ success: false, message: "Report not found" });
      return;
    }

    const [files] = await pool.query("SELECT * FROM report_files WHERE report_id = ?", [reportId]);
    console.log("Files found for report", reportId, ":", files);

    res.status(200).json({
      success: true,
      data: {
        report: (reports as any[])[0],
        files,
      },
    });
  } catch (error) {
    console.error("Get report detail error:", error);
    res.status(500).json({ success: false, message: "Failed to get report detail" });
  }
};

// ✅ Get Categories
export const getCategories = async (_req: AuthRequest, res: Response): Promise<void> => {
  try {
    const [rows] = await pool.query("SELECT * FROM categories ORDER BY name ASC");
    res.status(200).json({ success: true, data: rows });
  } catch (error) {
    console.error("Get categories error:", error);
    res.status(500).json({ success: false, message: "Failed to get categories" });
  }
};

// ADMIN: Get All Reports
export const getAllReports = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const [rows] = await pool.query("SELECT * FROM reports ORDER BY created_at DESC");
    res.status(200).json({ success: true, data: rows });
  } catch (error) {
    console.error("Get all reports error:", error);
    res.status(500).json({ success: false, message: "Failed to get all reports" });
  }
};

// ADMIN: Update Report Status
export const updateReportStatus = async (req: AuthRequest, res: Response): Promise<void> => {
  const reportId = req.params.id;
  const { status } = req.body;
  const allowedStatus = ["menunggu", "proses", "selesai", "ditolak"];
  try {
    if (!allowedStatus.includes(status)) {
      res.status(400).json({ success: false, message: "Invalid status value" });
      return;
    }
    // Get current status
    const [reports] = await pool.query("SELECT status FROM reports WHERE id = ?", [reportId]);
    if ((reports as any[]).length === 0) {
      res.status(404).json({ success: false, message: "Report not found" });
      return;
    }
    const currentStatus = (reports as any[])[0].status;
    // Validasi transisi status
    if (
      (currentStatus === "menunggu" && ["proses", "ditolak"].includes(status)) ||
      (currentStatus === "proses" && status === "selesai")
    ) {
      await pool.query("UPDATE reports SET status = ?, updated_at = NOW() WHERE id = ?", [status, reportId]);
      res.status(200).json({ success: true, message: "Status updated" });
    } else {
      res.status(400).json({ success: false, message: "Invalid status transition" });
    }
  } catch (error) {
    console.error("Update report status error:", error);
    res.status(500).json({ success: false, message: "Failed to update status" });
  }
};
