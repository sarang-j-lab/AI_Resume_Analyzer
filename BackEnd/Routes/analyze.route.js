import express from "express";
import { anaylyzeResume } from "../Controllers/analyze.controller.js";

const router = express.Router();


router.post("/analyze-resume",anaylyzeResume)



export default router;