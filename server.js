    require('dotenv').config();
    const express = require('express');
    const path = require('path');
    const { sequelize } = require("./config/db");

    const Users = require('./models/Users'); // Users 모델 가져오기

    const app = express();
    const port = 8080;

    // 데이터베이스 연결
    sequelize
    .sync({ force: false })
    .then(()=>{
        console.log('데이터베이스 연결 성공');
    }).catch(err=>{
        console.log(err);
    });

    // EJS를 뷰 엔진으로 설정
    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, 'views'));

    // 미들웨어 설정
    app.use(express.json());
    app.use(express.urlencoded({ extended: true })); // URL-encoded 데이터 파싱


    // 데이터 삽입 작업
    // Users.bulkCreate([
    //     { username: 'Alice', email: 'alice@example.com' },
    //     { username: 'Bob', email: 'bob@example.com' }
    // ]).then(() => {
    //     console.log('Users inserted');
    // }).catch(err => {
    //     console.error('Failed to insert users:', err);
    // });


    // 기본 라우트 설정
    app.get('/', (req, res) => {
        res.send("Hi");
    });
    app.get('/users', async (req, res) => {
        try {
          const users = await Users.findAll();
          res.json(users);
        } catch (error) {
          console.error('Error fetching users:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
    });


    // 서버 시작
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
