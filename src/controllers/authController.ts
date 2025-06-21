import type { Request, Response } from "express"
import { pool } from "../config/database"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

export const register = async (req: Request, res: Response) => {
  const connection = await pool.getConnection()
  try {
    const { full_name, email, password } = req.body

    if (!full_name || !email || !password) {
      res.status(400).json({
        success: false,
        message: "Semua field wajib diisi",
      })
      return
    }

    // Check if user already exists
    const [existingUsers] = await connection.execute("SELECT id FROM users WHERE email = ?", [email])

    if ((existingUsers as any[]).length > 0) {
      res.status(409).json({
        success: false,
        message: "Email sudah terdaftar",
      })
      return
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await connection.execute(
      `INSERT INTO users (full_name, email, password, created_at, updated_at)
       VALUES (?, ?, ?, NOW(), NOW())`,
      [full_name, email, hashedPassword],
    )

    res.status(201).json({
      success: true,
      message: "Register berhasil",
    })
  } catch (error) {
    console.error("Register error:", error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  } finally {
    connection.release()
  }
}

export const login = async (req: Request, res: Response) => {
  const connection = await pool.getConnection()
  try {
    const { email, password } = req.body

    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: "Email and password are required",
      })
      return
    }

    const [users] = await connection.execute("SELECT * FROM users WHERE email = ?", [email])

    const user = (users as any[])[0]

    if (!user) {
      res.status(401).json({
        success: false,
        message: "Invalid credentials",
      })
      return
    }

    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      res.status(401).json({
        success: false,
        message: "Invalid credentials",
      })
      return
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET as string, { expiresIn: "1d" })

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error) {
    console.error("Login error:", error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  } finally {
    connection.release()
  }
}
