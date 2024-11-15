import express from "express";
import mongoose from "mongoose";
import { DATABASE_URL } from "./env.js"; // mongodb
import path from "path";
import { fileURLToPath } from "url"; // __dirname쓰기위함
import bodyParser from "body-parser"; // json 쪼개기
import cookieParser from "cookie-parser"; // 쿠키 쪼개기
import jwt from "jsonwebtoken"; // jwt 토큰 만드는거

import authRouter from "./routes/auth.js"; // 라우터들 임포트하기
import userRouter from "./routes/user.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.static("web"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/user", userRouter); // 라우터 등록하기
app.use("/auth", authRouter);

app.get("/", (req, res) => {
  // 처음 페이지
  res.sendFile(__dirname + "/web/html/index.html");
});

app.get("/main", async (req, res) => {
  const token = req.cookies.x_auth;
  console.log(token);
  if (!token) {
    return res.redirect("/login.html"); // 로그인 상태가 아니면 로그인 페이지로 리디렉션
  }
  try {
    // 토큰을 디코딩하여 userId 가져오기
    const decoded = jwt.verify(token, "secretKey");
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.redirect("/login.html");
    }
  } catch (error) {
    res.redirect("/web/html/index.html");
  }
});

app.listen(5500, () => console.log("server Started"));
mongoose.connect(DATABASE_URL).then(() => console.log("Connected to DB"));
