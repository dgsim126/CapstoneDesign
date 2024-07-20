const User = require('../../models/User/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  try {
    const { email, password, name, birth, gender, job } = req.body;

    // 이미 존재하는 이메일인지 확인
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).send('Email already in use');
    }

    // 비밀번호 해싱
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // User 테이블에 데이터 저장
    const newUser = await User.create({
      email,
      password: hashedPassword,
      name,
      birth,
      gender,
      job
    });

    res.json({
      message: 'Registration successful'
    });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).send('Error during registration');
  }
};

module.exports = { register };