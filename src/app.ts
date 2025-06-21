import express, { Request, Response } from "express"
import cors from "cors"
import dotenv from "dotenv"
import path from "path"
import fs from "fs"

import { connectDB } from "./config/database"
import authRoutes from "./routes/auth"
import dashboardRoutes from "./routes/dashboard"
import reportRoutes from "./routes/report"
import { errorHandler } from "./middleware/errorHandler"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors({
  origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Static files for uploaded files - serve the entire uploads directory
app.use("/uploads", express.static(path.join(__dirname, "../uploads"), {
  setHeaders: (res, filePath) => {
    console.log(`Serving static file: ${filePath}`);
    
    // Set CORS headers - allow all origins for static files
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Expose-Headers', 'Content-Length, Content-Range, Content-Type');
    
    // Set cache headers
    res.setHeader('Cache-Control', 'public, max-age=31536000'); // Cache for 1 year
    
    // Set proper content-type for common file types
    const ext = path.extname(filePath).toLowerCase();
    if (ext === '.jpg' || ext === '.jpeg') {
      res.setHeader('Content-Type', 'image/jpeg');
    } else if (ext === '.png') {
      res.setHeader('Content-Type', 'image/png');
    } else if (ext === '.gif') {
      res.setHeader('Content-Type', 'image/gif');
    } else if (ext === '.webp') {
      res.setHeader('Content-Type', 'image/webp');
    } else if (ext === '.mp4') {
      res.setHeader('Content-Type', 'video/mp4');
    } else if (ext === '.webm') {
      res.setHeader('Content-Type', 'video/webm');
    } else if (ext === '.avi') {
      res.setHeader('Content-Type', 'video/x-msvideo');
    } else if (ext === '.mp3') {
      res.setHeader('Content-Type', 'audio/mpeg');
    } else if (ext === '.wav') {
      res.setHeader('Content-Type', 'audio/wav');
    } else if (ext === '.ogg') {
      res.setHeader('Content-Type', 'audio/ogg');
    }
    
    console.log(`Headers set for ${filePath}: Content-Type=${res.getHeader('Content-Type')}`);
  }
}))

// Add logging middleware to track all requests
app.use((req: Request, res: Response, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Add a test endpoint to check if files exist
app.get("/api/test-file/:filename", (req: Request, res: Response) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, "../uploads", filename);
  console.log(`Testing file access: ${filePath}`);
  
  if (fs.existsSync(filePath)) {
    const stats = fs.statSync(filePath);
    res.json({
      success: true,
      message: "File exists",
      data: {
        filename,
        size: stats.size,
        created: stats.birthtime,
        modified: stats.mtime
      }
    });
  } else {
    res.status(404).json({
      success: false,
      message: "File not found",
      data: { filename, filePath }
    });
  }
});

// Add endpoint to check specific file in uploads directory
app.get("/api/check-file/:category/:filename", (req: Request, res: Response) => {
  const { category, filename } = req.params;
  const filePath = path.join(__dirname, "../uploads", category, filename);
  console.log(`Checking file: ${filePath}`);
  
  if (fs.existsSync(filePath)) {
    const stats = fs.statSync(filePath);
    res.json({
      success: true,
      message: "File exists",
      data: {
        category,
        filename,
        filePath,
        size: stats.size,
        created: stats.birthtime,
        modified: stats.mtime
      }
    });
  } else {
    res.status(404).json({
      success: false,
      message: "File not found",
      data: { category, filename, filePath }
    });
  }
});

// Add endpoint to list all files in uploads directory
app.get("/api/list-files", (req: Request, res: Response) => {
  const uploadsPath = path.join(__dirname, "../uploads");
  const files: any[] = [];
  
  try {
    console.log(`Checking uploads directory: ${uploadsPath}`);
    console.log(`Directory exists: ${fs.existsSync(uploadsPath)}`);
    
    if (!fs.existsSync(uploadsPath)) {
      res.status(404).json({
        success: false,
        message: "Uploads directory not found",
        data: { uploadsPath }
      });
      return;
    }
    
    const categories = ['images', 'videos', 'audio'];
    categories.forEach(category => {
      const categoryPath = path.join(uploadsPath, category);
      console.log(`Checking category ${category}: ${categoryPath}`);
      console.log(`Category exists: ${fs.existsSync(categoryPath)}`);
      
      if (fs.existsSync(categoryPath)) {
        const categoryFiles = fs.readdirSync(categoryPath);
        console.log(`Files in ${category}:`, categoryFiles);
        categoryFiles.forEach(file => {
          files.push({
            category,
            filename: file,
            path: `${category}/${file}`,
            fullPath: path.join(categoryPath, file)
          });
        });
      }
    });
    
    res.json({
      success: true,
      data: {
        uploadsPath,
        totalFiles: files.length,
        files
      }
    });
  } catch (err) {
    const error = err as Error;
    console.error("Error listing files:", error);
    res.status(500).json({
      success: false,
      message: "Failed to list files",
      error: error.message
    });
  }
});

// Add endpoint to serve file with proper headers
app.get("/api/file/:category/:filename", (req: Request, res: Response) => {
  const { category, filename } = req.params;
  const filePath = path.join(__dirname, "../uploads", category, filename);
  
  console.log(`Serving file: ${filePath}`);
  
  if (fs.existsSync(filePath)) {
    const stats = fs.statSync(filePath);
    const ext = path.extname(filename).toLowerCase();
    
    // Set proper content-type
    let contentType = 'application/octet-stream';
    if (ext === '.jpg' || ext === '.jpeg') {
      contentType = 'image/jpeg';
    } else if (ext === '.png') {
      contentType = 'image/png';
    } else if (ext === '.gif') {
      contentType = 'image/gif';
    } else if (ext === '.mp4') {
      contentType = 'video/mp4';
    } else if (ext === '.webm') {
      contentType = 'video/webm';
    } else if (ext === '.mp3') {
      contentType = 'audio/mpeg';
    } else if (ext === '.wav') {
      contentType = 'audio/wav';
    }
    
    // Set headers
    res.setHeader('Content-Type', contentType);
    res.setHeader('Content-Length', stats.size);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
    res.setHeader('Cache-Control', 'public, max-age=31536000');
    
    // Stream the file
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
    
    fileStream.on('error', (error) => {
      console.error('Error streaming file:', error);
      res.status(500).json({ success: false, message: 'Error streaming file' });
    });
  } else {
    res.status(404).json({
      success: false,
      message: "File not found",
      data: { category, filename, filePath }
    });
  }
});

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/dashboard", dashboardRoutes)
app.use("/api/reports", reportRoutes)

// Health check endpoint
app.get("/api/health", (req: Request, res: Response) => {
  res.json({
    success: true,
    message: "Disability Discrimination Report API is running",
    timestamp: new Date().toISOString(),
  })
})

// Error handler middleware
app.use(errorHandler)

// 404 fallback
app.use("*", (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Endpoint not found",
  })
})

// Start server
const startServer = async () => {
  try {
    await connectDB()
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`)
      console.log(`📊 API Health Check: http://localhost:${PORT}/api/health`)
    })
  } catch (error) {
    console.error("Failed to start server:", error)
    process.exit(1)
  }
}

startServer()

export default app
