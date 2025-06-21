import { ErrorRequestHandler } from "express"
import { MulterError } from "multer"

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error("Error:", err)

  if (err instanceof MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      res.status(400).json({
        success: false,
        message: "File size too large. Maximum size is 3MB per file.",
      })
      return
    }

    if (err.code === "LIMIT_FILE_COUNT") {
      res.status(400).json({
        success: false,
        message: "Too many files. Maximum 5 files allowed.",
      })
      return
    }
  }

  res.status(500).json({
    success: false,
    message: "Internal server error",
  })
}
