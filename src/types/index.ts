export interface User {
  id: number
  full_name: string
  email: string
  password: string
  role: 'user' | 'admin'
  created_at: Date
  updated_at: Date
}

export interface Category {
  id: number
  name: string
  description?: string
  created_at: Date
}

export interface Report {
  id: number
  user_id: number
  incident_description: string
  incident_time: string
  category_id: number
  incident_location: string
  incident_date: string
  violation_description: string
  status: "menunggu" | "proses" | "selesai" | "ditolak"
  created_at: Date
  updated_at: Date
}

export interface ReportFile {
  id: number
  report_id: number
  file_name: string
  file_path: string
  file_type: "image" | "video" | "audio"
  file_size: number
  mime_type: string
  created_at: Date
}

export interface CreateReportRequest {
  incident_description: string
  incident_time: string
  category_id: number
  incident_location: string
  incident_date: string
  violation_description: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  full_name: string
  email: string
  password: string
  confirm_password: string
}

export interface AuthUser {
  id: number
  full_name: string
  email: string
}
