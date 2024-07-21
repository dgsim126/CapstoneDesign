require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const { sequelize } = require("./config/db");

const User = require('./models/User/user');
const Company = require('./models/Company/company');
const Scrap = require('./models/Scrap/scrap');
const StudentSupportInfo = require('./models/ITInfo/StudentSupportInfo/studentSupportInfoModel');
const QualificationInfo = require('./models/ITInfo/QualificationInfo/qualificationInfoModel');
const RecruitmentNoticeInfo = require('./models/ITInfo/RecruitmentNoticeInfo/recruitmentNoticeInfoModel');

// 모델 초기화 => 초기 한 번만 진행하면 scrap 테이블 갱신됨
// User.init(sequelize);
// Company.init(sequelize);
// Scrap.init(sequelize);
// StudentSupportInfo.init(sequelize);
// QualificationInfo.init(sequelize);
// RecruitmentNoticeInfo.init(sequelize);

// 모델 간의 관계 설정
User.associate({ Scrap });
Company.associate({ Scrap });
Scrap.associate({ User, Company, StudentSupportInfo, QualificationInfo, RecruitmentNoticeInfo });
StudentSupportInfo.associate({ Scrap });
QualificationInfo.associate({ Scrap });
RecruitmentNoticeInfo.associate({ Scrap });

const app = express();
const port = 8080;

// 데이터베이스 연결
sequelize.sync({ force: false })
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
app.use(cookieParser()); // 쿠키 파서 미들웨어 추가

// 기본 라우트 => routers 폴더로 이동
app.use("/", require("./routers/main"));

// 회원가입, 로그인, 로그아웃, 프로필
app.use('/api/register', require('./routers/User/registerRoute'));
app.use('/api', require('./routers/User/loginRoute'));
app.use('/api/profile', require('./routers/User/profileRoute'));

// 기업 목록, 기업 상세, 관심기업 스크랩, 관리자 - 기업 추가
app.use("/api/company", require('./routers/Company/companyRoute'));

// 자유게시판, 스터디모집게시판, 댓글
app.use("/api/freeboard", require("./routers/FreeBoard/freeboardRoute"));
app.use("/api/freeboardComment", require("./routers/FreeBoard/freeboardCommentRoute"));
// app.use("/api/studyboard", require("./routers/StudyBoard/studyboardRoute"));
// app.use("/api/studyboardComment", require("./routers/StudyBoard/studyboardCommentRoute"));

// IT Info [학생지원, 자격증, 채용공고]
app.use("/api/studentSupportInfo", require("./routers/ITInfo/StudentSupportInfo/studentSupportInfoRoute"));
app.use("/api/qualificationInfo", require("./routers/ITInfo/QualificationInfo/qualificationInfoRoute"));
app.use("/api/recruitmentNoticeInfo", require("./routers/ITInfo/RecruitmentNoticeInfo/recruitmentNoticeInfoRoute"));

// 서버 시작
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});