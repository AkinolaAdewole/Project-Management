import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { dbConnection } from "./database/dbConnection.js";
import fileUpload from "express-fileupload";
import { errorMiddleware } from "./middlewares/error.js";
import userRouter from "./routes/userRouter.js";
import taskRouter from "./routes/taskRouter.js";

const app = express();
dotenv.config();



app.use(
  cors({
    origin: ['http://localhost:5173', 'https://project-management1.netlify.app'],
    methods: ["GET", "PUT", "DELETE", "POST"],
    credentials: true, 
  })
);






app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use("/user", userRouter);
app.use("/task", taskRouter);
app.get('/', (req,res)=>{
  res.send({message:"Hello world"});
});

app.get('/user/login', (req,res)=>{
  res.send({message:"Login Successfully"});
});

dbConnection();

app.use(errorMiddleware);

export default app;
