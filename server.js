require('dotenv').config();
const express = require('express');
const path = require('path');
const { sequelize } = require("./config/db");

// 모델 가져오기
const Freeboard = require('./models/FreeBoard/freeboard');
const FreeboardComment = require('./models/FreeBoard/freeboardComment');
const Studyboard = require('./models/StudyBoard/studyboard');
const StudyboardComment = require('./models/StudyBoard/studyboardComment');

// 모델 관계 설정(cascade를 위해)
Freeboard.associate({ FreeboardComment });
FreeboardComment.associate({ Freeboard });
Studyboard.associate({ StudyboardComment });
StudyboardComment.associate({ Studyboard });


const app = express();
const port = 8080;

// 데이터베이스 연결
sequelize
.sync({ force: false }) // 현재 모델 상태 반영(배포 시 false로 변환) // true 시 값 날라감
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

// 기본 라우트 => routers 폴더로 이동
app.use("/", require("./routers/main"));

// 자유게시판, 스터디모집게시판, 댓글
app.use("/api/freeboard", require("./routers/FreeBoard/freeboardRoute"));
app.use("/api/freeboardComment", require("./routers/FreeBoard/freeboardCommentRoute"));
app.use("/api/studyboard", require("./routers/StudyBoard/studyboardRoute"));
app.use("/api/studyboardComment", require("./routers/StudyBoard/studyboardCommentRoute"));

// 관리자
app.use("/api/admin/freeboard", require("./routers/admin/freeboardAdminRoute"));
app.use("/api/admin/studyboard", require("./routers/admin/studyboardAdminRoute"));





// 서버 시작
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
