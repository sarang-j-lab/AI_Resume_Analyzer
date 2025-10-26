import {  signin, signout, signup,authCheck } from "../Controllers/auth.controller.js";

import express from "express";

const router = express.Router();


router.get("/auth-check",authCheck)
router.post("/signin",signin)
router.post("/signup",signup)
router.post("/signout",signout)

export default router