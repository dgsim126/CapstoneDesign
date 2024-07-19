require('dotenv').config();
const express = require('express');
const path = require('path');
const { sequelize } = require("./config/db");

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

// 기본 라우트 => routers 폴더로 이동
app.use("/", require("./routers/main"));

// 자유게시판, 스터디모집게시판, 댓글
app.use("/api/freeboard", require("./routers/FreeBoard/freeboardRoute"));
app.use("/api/freeboardComment", require("./routers/FreeBoard/freeboardCommentRoute"));
// app.use("/api/studyboard", require("./routers/StudyBoard/studyboardRoute"));
// app.use("/api/studyboardComment", require("./routers/StudyBoard/studyboardCommentRoute"));

// IT Info [학생지원, 자격증, 채용공고]
app.use("/api/studentSupportInfo", require("./routers/ITInfo/StudentSupportInfo/studentSupportInfoRoute"));
// app.use("/api/qualificationInfo", require("./routers/ITInfo/QualificationInfo/qualificationInfoRoute"));
// app.use("/api/recruitmentNoticeInfo", require("./routers/ITInfo/RecruitmentNoticeInfo/recruitmentNoticeInfoRoute"));

// 서버 시작
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
