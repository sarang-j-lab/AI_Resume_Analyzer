import express from "express";
import { anaylyzeResume} from "../Controllers/analyze.controller.js";
import limiter from "../Config/rateLimiter.js";

const router = express.Router();


router.post("/analyze-resume",limiter,anaylyzeResume)



export default router;