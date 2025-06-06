import express from 'express';
import cors from "cors";
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 4000;

app.use(cors({
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true,
}));

app.use("/auth", authRoutes);

app.listen(PORT, () => {
    console.log(`Auth service is running on port ${PORT}`);
});