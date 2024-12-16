import dotenv from 'dotenv';
dotenv.config()

export const {
    PORT = 3000,
    SECRET_KEY = "ultra-secret-key-123456789987654321"
} = process.env;