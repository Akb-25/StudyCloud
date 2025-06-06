import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import progressRoutes from './routes/progressRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());    
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true,
}));

app.use("/progress", progressRoutes);

app.listen(PORT, () => {
    console.log(`Progress service is running on port ${PORT}`);
});