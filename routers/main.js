// 라우트 코드
const express = require("express");
const router = express.Router();

const Users = require('../models/Users'); // Users 모델 가져오기.
const asyncHandler = require("express-async-handler");

router.get('/', (req, res) => {
    res.send("Hi");
});
router.get('/users', asyncHandler(async (req, res) => {
    try {
      const users = await Users.findAll();
      res.json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
}));

module.exports = router;


// // 데이터 삽입 작업
// Users.bulkCreate([
//     { username: 'Alice', email: 'alice@example.com' },
//     { username: 'Bob', email: 'bob@example.com' }
// ]).then(() => {
//     console.log('Users inserted');
// }).catch(err => {
//     console.error('Failed to insert users:', err);
// });