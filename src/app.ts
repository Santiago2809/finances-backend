import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import auth_router from './routes/auth.routes';

dotenv.config();

const app = express();
app.use(express.json());
app.disable("x-powered-by");
const cors_options: cors.CorsOptions = {
    origin: (origin: any, callback) => {
        const ACCEPTED_ORIGINS = [
            'http://localhost:5173'
        ]
        if (ACCEPTED_ORIGINS.includes(origin)) {
            return callback(null, true);
        }
        if (!origin) {
            return callback(null, true);
        }

        return callback(new Error('Not allowed by cors'));
    },
    credentials: true,
    optionsSuccessStatus: 200
}
app.use(cors(cors_options))
const PORT = process.env.PORT || 3000;

app.use("/auth", auth_router);

app.listen(PORT, () => {
    console.log("Server running in PORT: " + PORT);
})