import multer from "multer"
import path from "path"
import fs from "fs"
import type { Express } from "express"

// Ensure upload directories exist with proper permissions
const uploadDirs = ["uploads/images", "uploads/videos", "uploads/audio"]
uploadDirs.forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true, mode: 0o755 })
    console.log(`Created directory: ${dir}`)
  } else {
    console.log(`Directory exists: ${dir}`)
  }
})

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = "uploads/"

    if (file.mimetype.startsWith("image/")) {
      uploadPath += "images/"
    } else if (file.mimetype.startsWith("video/")) {
      uploadPath += "videos/"
    } else if (file.mimetype.startsWith("audio/")) {
      uploadPath += "audio/"
    }

    console.log(`Saving file to: ${uploadPath}`)
    cb(null, uploadPath)
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
    const filename = file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    console.log(`Generated filename: ${filename}`)
    cb(null, filename)
  },
})

const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedImageTypes = ["image/png", "image/jpeg", "image/jpg"]
  const allowedVideoTypes = ["video/mp4", "video/quicktime"]
  const allowedAudioTypes = ["audio/mpeg", "audio/wav"]

  const allAllowedTypes = [...allowedImageTypes, ...allowedVideoTypes, ...allowedAudioTypes]

  console.log(`File type: ${file.mimetype}`)
  if (allAllowedTypes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(new Error("Invalid file type. Only PNG, JPG, MP4, MOV, MP3, WAV files are allowed."))
  }
}

export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 3 * 1024 * 1024, // 3MB limit
    files: 5, // Maximum 5 files (4 evidence + 1 audio)
  },
  fileFilter: fileFilter,
})
