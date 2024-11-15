import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../model/user.js";
import authenticated from "../middleware/authMiddleware.js"; // authenticate 미들웨어 import

const router = express.Router();

// 회원가입하기
router.post("/signup", async (req, res) => {
  const salt = bcrypt.genSaltSync(10);
  const encrypted = bcrypt.hashSync(req.body.password, salt);
  // 암호화하기
  const user = new User({
    // user에 User형식으로 만들어주고 password에 넣어주기
    ...req.body,
    password: encrypted,
  });

  try {
    await user.save(); // 그리고 비동기로 저장하기
    res
      .status(201)
      .json({ success: true, message: "회원가입이 완료되었습니다!" });
  } catch (err) {
    // 실패하면 오류발생
    res.status(400).json({ success: false, error: err.message });
  }
});

// 로그인하기
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email }).select(
      "+password" // password도 가져오기
    );
    if (!user) {
      // user가 없으면
      return res.json({
        loginSuccess: false,
        message: "이메일을 다시 확인하세요",
      });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      // user가 있긴한데 compare해서 안맞으면
      return res.json({
        loginSuccess: false,
        message: "비밀번호가 틀렸습니다",
      });
    }

    // 토큰 생성하기
    const token = jwt.sign({ userId: user._id }, "secretKey", {
      expiresIn: "1h",
    });

    // 쿠키에 토큰 저장
    res.cookie("x_auth", token, { httpOnly: true });
    // .status(200).json({
    //   loginSuccess: true,
    //   message: "로그인에 성공하였습니다!",
    //   userId: user._id,
    // });
    res.redirect("/user/dashboard");
  } catch (error) {
    res
      .status(500)
      .json({ loginSuccess: false, message: "서버 오류가 발생했습니다." });
  }
});

export default router;
