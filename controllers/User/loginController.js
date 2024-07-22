const Users = require('../../models/User/Users');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 사용자가 입력한 이메일로 데이터베이스에서 사용자 찾기
    const user = await Users.findOne({ where: { email } });

    if (!user) {
      return res.status(401).send('Invalid email or password');
    }

    // 비밀번호 비교
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).send('Invalid email or password');
    }

    // 로그인 성공
    res.send('Login successful');
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send('Error during login');
  }
};
