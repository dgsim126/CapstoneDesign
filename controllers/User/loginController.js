const asyncHandler = require('express-async-handler');
const User = require('../../models/User/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const jwtSecret = process.env.JWT_SECRET;

// POST /api/login
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // 사용자가 입력한 이메일로 데이터베이스에서 사용자 찾기
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(401).send('Invalid email or password');
  }

  // 비밀번호 비교
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).send('Invalid email or password');
  }

  // JWT 토큰 생성
  const payload = { userID: user.userID, email: user.email };
  const token = jwt.sign(payload, jwtSecret, { expiresIn: '1h' });

  // JWT 토큰을 쿠키에 설정
  res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

  // 로그인 성공 및 토큰 반환
  res.json({
    message: 'Login successful'
  });
});

// POST /api/logout
const logout = (req, res) => {
  res.clearCookie("token");
  res.send("Logout successful");
};

module.exports = { login, logout };