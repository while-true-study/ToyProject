import express from "express";
import authMiddleware from "../middleware/authMiddleware.js"; // 미들웨어 가져오기

const router = express.Router();

// 로그인 후 인증된 사용자만 접근할 수 있는 프로필 경로
router.get("/profile", authMiddleware, (req, res) => {
  res.json({ message: "프로필 페이지", userId: req.userId });
});

// 다른 보호된 경로 예시
router.get("/dashboard", authMiddleware, (req, res) => {
  res.json({ message: "대시보드 페이지", userId: req.userId });
});

export default router;
