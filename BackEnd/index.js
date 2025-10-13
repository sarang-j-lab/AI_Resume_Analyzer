import express from 'express'
import connectDB from './Config/DbConfig.js';
const PORT = process.env.PORT || 5000;
import authRouter from "./Routes/auth.route.js"
import dotenv from 'dotenv'
import bodyParser from 'body-parser';
import cors from 'cors'
import cookieParser from 'cookie-parser';

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


app.use("/api/auth", authRouter)


// app.use((err, req, res) => {
//     console.error('Error:', err.message);

//     return res.status(err.statusCode || 500).json({
//         success: false,
//         status: err.status || 'error',
//         message: err.message || 'Something went wrong on the server!',
//     });
// })

app.listen(PORT, () => {
    connectDB()
    console.log(`Server started on port ${PORT}`)
})

