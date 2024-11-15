import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  name: { type: String, maxlength: 50 },
  email: { type: String, trim: true },
  password: { type: String, minlength: 5, select: true }, // select: true 추가
});

// userSchema.methods.comparePassword = function (inputPassword, callback) {
//   bcrypt.compare(inputPassword, this.password, (err, isMatch) => {
//     if (err) return callback(err);
//     callback(null, isMatch);
//   });  // 비교 함수
// };

userSchema.methods.generateToken = async function () {
  try {
    const user = this;
    const token = jwt.sign({ _id: user._id.toHexString() }, "secretToken", {
      expiresIn: "1h",
    });
    user.token = token;
    await user.save(); // 비동기 방식으로 저장
    return user;
  } catch (error) {
    throw error;
  }
};

// model export하기
const User = mongoose.model("User", userSchema);
export default User;
