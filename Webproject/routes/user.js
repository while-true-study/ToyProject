import express from "express";
import jwt from "jsonwebtoken";
import User from "../model/user.js";

import authenticated from "../middleware/authMiddleware.js"; // authenticate 미들웨어 import

const router = express.Router();

// 개인 페이지 라우터
router.get("/dashboard", authenticated, (req, res) => {
  res.send(`안녕하세요. ${req.name}님 어서오세요!`);
});

export default router;
