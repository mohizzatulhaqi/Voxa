import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import { pool } from "../config/database"

export interface AuthRequest extends Request {
  user?: { id: string } // Tambahkan properti sesuai payload token
}

export const authenticateToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers["authorization"]
  const token = authHeader?.split(" ")[1]

  if (!token) {
    res.status(401).json({ message: "Unauthorized" })
    return
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string }
    req.user = { id: decoded.id }
    next()
  } catch (err) {
    res.status(403).json({ message: "Forbidden" })
  }
}

export const isAdmin = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const [rows] = await pool.query("SELECT role FROM users WHERE id = ?", [userId]);
    if ((rows as any[]).length > 0 && (rows as any[])[0].role === "admin") {
      next();
    } else {
      res.status(403).json({ message: "Forbidden: Admin only" });
    }
  } catch (error) {
    console.error("Admin check error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
