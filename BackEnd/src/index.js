import express from 'express'
import connectDB from './Config/DbConfig.js';
import authRouter from "./Routes/auth.route.js"
import dotenv from 'dotenv'
import bodyParser from 'body-parser';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import analyzeRouter from "./Routes/analyze.route.js"
import multer from 'multer';
import path from 'path'
const PORT = process.env.PORT || 5000;

dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true
}))

app.get("/", (req, res) => {
    return res.send("hello world")
})

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "src/uploads/"); // directory to save uploaded files
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + path.extname(file.originalname);
        cb(null, uniqueName);
    },
});
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1 * 1024 * 1024, // 1 MB
    },
    fileFilter: (req, file, cb) => {
        // Optional: only allow certain file types
        const allowedTypes = ["application/pdf"];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Only PDF files are allowed"));
        }
    },
});



app.use("/api/auth", authRouter)
app.use("/api/analyze", upload.single("file"), analyzeRouter)

app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Something went wrong";
    return res.status(statusCode).json({message:message});
})



app.listen(PORT, () => {
    connectDB()
    console.log(`Server started on port ${PORT}`)
})

