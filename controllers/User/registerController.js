const asyncHandler = require('express-async-handler');
const User = require('../../models/User/user');
const bcrypt = require('bcrypt');

// POST /api/register
const register = asyncHandler(async (req, res) => {
  const { email, password, name, birth, gender, job, accessAsAdmin } = req.body;

  // 이미 존재하는 이메일인지 확인
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    return res.status(400).send('Email already in use');
  }

  // 비밀번호 해싱
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // 사용자가 관리자인지 여부 결정
  const isAdmin = accessAsAdmin === process.env.ADMIN_KEY;

  // User 테이블에 데이터 저장
  const newUser = await User.create({
    email,
    password: hashedPassword,
    name,
    birth,
    gender,
    job,
    isAdmin
  });

  const message = isAdmin ? 'Admin registration successful' : 'Registration successful';

  res.json({
    message: message
  });
});

module.exports = { register };