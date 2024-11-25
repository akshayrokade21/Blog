import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';

import connectdb from './dbconn/conn.js';
import userRoute from './routes/userRoutes.js';
import authRoute from './routes/authRoutes.js';
import blogRoute from './routes/blogRoutes.js'
import { authMiddleware } from './middlewares/auth.js';

//configure env
dotenv.config()

//rest object
const app = (express());
const port = process.env.PORT;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//database config
connectdb();

const allowedOrigins = ['http://localhost:3000', 'http://172.29.112.1:3000'];
const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200,
};
//middlewares
app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use((req, res, next) => {
    req.setTimeout(300000);
    res.setTimeout(300000);
    next();
});
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//user route
app.use('/user', authMiddleware, userRoute)

//blog route
app.use('/blog', authMiddleware, blogRoute)

//auth route
app.use('/auth', authRoute)

app.listen(port, () => console.log(`server running on http://localhost:${port}`)
)