import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import connectDB from "./config/db.js";

import authRoutes from "./routes/auth.route.js";
import taskRoutes from "./routes/task.route.js";

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
 origin:process.env.FRONTEND_URL,
 credentials:true
}));

app.use("/api/auth",authRoutes);
app.use("/api/tasks",taskRoutes);

const PORT=process.env.PORT;

app.listen(PORT,()=>{
 console.log("Server running at Port",PORT);
});

app.get('/', (req, res) => {
   console.log( "HELLO WORLD");
  });