import jwt from "jsonwebtoken";
import User from "../model/user.js";

const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.x_auth; // 토큰 값 받아오기

    if (!token) {
      // 토큰이 없다? => 로그인이 안된거임
      return res.status(401).json({ message: "인증이 필요합니다." });
    }
    // 토큰이 있으면 token값을 해독해줌 그리고 user에 해독한 값으로 Id를 찾아서 넣음
    const decoded = jwt.verify(token, "secretKey");
    const user = await User.findById(decoded.userId);
    // 근데 사용자가 없다? => 401
    if (!user) {
      return res.status(401).json({ message: "사용자를 찾을 수 없습니다." });
    }
    // 찾았다! req.user
    req.user = user;
    req.name = user.name;
    req.hi = "false";

    next(); // 돌아가기
  } catch (error) {
    res.status(401).json({ message: "유효하지 않은 토큰입니다." });
  }
};

export default authenticate;
