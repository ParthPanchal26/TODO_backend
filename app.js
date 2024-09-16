import express from 'express';
import { config } from 'dotenv';
import userRouter from './routes/users.route.js';
import taskRouter from './routes/tasks.route.js';
import cookieParser from 'cookie-parser';
import { errorMiddleware } from './middlewares/error.middleware.js';
import cors from "cors";

export const app = express();

config({
    path: "./config/config.env"
});

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: [process.env.FRONTEND_URL],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);

// Initial order ...
/*
 app.use("/api/v1/users", userRouter);
 app.use(cookieParser()); 
*/
// In this initial order, the cookieParser middleware is defined after the route
// for /api/v1/users. This means that when a request is made to any endpoint under
// /api/v1/users, the cookieParser middleware is not executed before the route handlers,
// and req.cookies remains undefined.

// Correct order ...
app.use("/api/v1/users", userRouter);
app.use("/api/v1/tasks", taskRouter);

// Empty route GET API
app.get('/', (req, res) => {
    res.send("Server is running!");
    console.log(`Server listening on https://todo-backend-kmx3.onrender.com/ in ${process.env.NODE_ENV} mode!`);
});

app.use(errorMiddleware)