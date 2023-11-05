import 'dotenv/config'

export const PORT = process.env.PORT ?? 3000
export const JWT_SECRET = process.env.JWT_SECRET ?? 'JWT_SECRET'

export const OBJECTION_DB_HOST = process.env.OBJECTION_DB_HOST ?? '127.0.0.1' ?? '192.168.1.160'
export const OBJECTION_DB_PORT = process.env.OBJECTION_DB_PORT ?? 3307
export const OBJECTION_DB_USER = process.env.OBJECTION_DB_USER ?? 'root'
export const OBJECTION_DB_PASSWORD = process.env.OBJECTION_DB_PASSWORD ?? 'wiler'
export const OBJECTION_DB_NAME = process.env.OBJECTION_DB_NAME ?? 'inventory'

export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME
export const CLOUDINARY_CLOUD_API_KEY = process.env.CLOUDINARY_CLOUD_API_KEY
export const CLOUDINARY_CLOUD_API_SECRET = process.env.CLOUDINARY_CLOUD_API_SECRET
