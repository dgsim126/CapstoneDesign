const { sequelize } = require('./config/db');
const RecruitmentNoticeInfo = require('./models/ITInfo/RecruitmentNoticeInfo/recruitmentNoticeInfoModel');
const Studyboard = require('./models/StudyBoard/studyboard');

const recruitmentNotices = [
    {
        "key": 1,
        "title": "2024년 상반기 신입사원 채용 공고",
        "startdate": "2024-08-01T00:00:00.000Z",
        "enddate": "2024-08-31T23:59:59.000Z",
        "resultdate": "2024-09-15T00:00:00.000Z",
        "pic1": "pic1.jpg",
        "pic2": "pic2.jpg",
        "pic3": "pic3.jpg",
        "pic4": "pic4.jpg",
        "pic5": "pic5.jpg",
        "body": "우리 회사에서는 2024년 상반기 신입사원을 모집합니다. 많은 지원 바랍니다.",
        "experience": "신입 가능",
        "education": "학사 이상",
        "stack": "JavaScript, Node.js, React",
        "qualification": "관련 학과 졸업자",
        "preferences": "유관 경력자 우대",
        "work_type": "정규직",
        "salary": "연봉 3,500만원 이상",
        "location": "서울특별시",
        "work_time": "주 5일, 09:00 ~ 18:00",
        "recruit_part": "개발, 디자인, 마케팅",
        "duties": "웹 개발, UI/UX 디자인, 마케팅 전략 수립",
        "key_skills": "문제 해결 능력, 팀워크, 커뮤니케이션",
        "recruit_num": 3,
        "link": "https://example.com/apply",
        "companyname": "ABC Corporation"
      },
      {
        "key": 2,
        "title": "경력직 백엔드 개발자 모집",
        "startdate": "2024-09-01T00:00:00.000Z",
        "enddate": "2024-09-30T23:59:59.000Z",
        "resultdate": "2024-10-15T00:00:00.000Z",
        "pic1": "backend_pic1.jpg",
        "pic2": "backend_pic2.jpg",
        "body": "백엔드 개발자를 모집합니다. Java, Spring 전문가를 찾습니다.",
        "experience": "3년 이상",
        "education": "학사 이상",
        "stack": "Java, Spring, MySQL",
        "work_type": "정규직",
        "salary": "연봉 5,000만원 이상",
        "location": "부산광역시",
        "companyname": "Tech Solutions Inc."
      },
      {
        "key": 3,
        "title": "AI 연구원 채용",
        "startdate": "2024-10-01T00:00:00.000Z",
        "enddate": "2024-10-31T23:59:59.000Z",
        "resultdate": "2024-11-15T00:00:00.000Z",
        "pic1": "ai_pic1.jpg",
        "body": "AI 연구소에서 머신러닝 전문가를 모집합니다.",
        "experience": "신입 및 경력",
        "education": "석사 이상",
        "stack": "Python, TensorFlow, PyTorch",
        "work_type": "정규직",
        "salary": "연봉 6,000만원 이상",
        "location": "대전광역시",
        "companyname": "AI Research Lab"
      },
      {
        "key": 4,
        "title": "프론트엔드 개발자 채용",
        "startdate": "2024-11-01T00:00:00.000Z",
        "enddate": "2024-11-30T23:59:59.000Z",
        "resultdate": "2024-12-15T00:00:00.000Z",
        "pic1": "frontend_pic1.jpg",
        "body": "React 전문가를 찾습니다. 최신 웹 기술에 관심 있는 분들의 지원을 기다립니다.",
        "experience": "2년 이상",
        "education": "학력 무관",
        "stack": "React, Redux, TypeScript",
        "work_type": "정규직",
        "salary": "연봉 4,500만원 이상",
        "location": "서울특별시",
        "companyname": "Web Wizards Co."
      },
      {
        "key": 5,
        "title": "데이터 분석가 모집",
        "startdate": "2024-12-01T00:00:00.000Z",
        "enddate": "2024-12-31T23:59:59.000Z",
        "resultdate": "2025-01-15T00:00:00.000Z",
        "pic1": "data_pic1.jpg",
        "body": "빅데이터 분석 전문가를 찾습니다. 통계와 프로그래밍 실력을 겸비한 분을 모십니다.",
        "experience": "5년 이상",
        "education": "석사 이상",
        "stack": "Python, R, SQL, Hadoop",
        "work_type": "정규직",
        "salary": "연봉 7,000만원 이상",
        "location": "성남시",
        "companyname": "Data Insights Corp."
      },
      {
        "key": 6,
        "title": "모바일 앱 개발자 채용",
        "startdate": "2025-01-01T00:00:00.000Z",
        "enddate": "2025-01-31T23:59:59.000Z",
        "resultdate": "2025-02-15T00:00:00.000Z",
        "pic1": "mobile_pic1.jpg",
        "body": "안드로이드 및 iOS 앱 개발자를 모집합니다. 크로스 플랫폼 개발 경험자 우대.",
        "experience": "3년 이상",
        "education": "학사 이상",
        "stack": "Java, Kotlin, Swift, Flutter",
        "work_type": "정규직",
        "salary": "연봉 5,500만원 이상",
        "location": "인천광역시",
        "companyname": "Mobile Masters Ltd."
      },
      {
        "key": 7,
        "title": "DevOps 엔지니어 모집",
        "startdate": "2025-02-01T00:00:00.000Z",
        "enddate": "2025-02-28T23:59:59.000Z",
        "resultdate": "2025-03-15T00:00:00.000Z",
        "pic1": "devops_pic1.jpg",
        "body": "클라우드 환경에서의 배포 및 운영 경험이 풍부한 DevOps 엔지니어를 찾습니다.",
        "experience": "4년 이상",
        "education": "학력 무관",
        "stack": "AWS, Docker, Kubernetes, Jenkins",
        "work_type": "정규직",
        "salary": "연봉 6,500만원 이상",
        "location": "서울특별시",
        "companyname": "Cloud Systems Inc."
      },
      {
        "key": 8,
        "title": "UI/UX 디자이너 채용",
        "startdate": "2025-03-01T00:00:00.000Z",
        "enddate": "2025-03-31T23:59:59.000Z",
        "resultdate": "2025-04-15T00:00:00.000Z",
        "pic1": "design_pic1.jpg",
        "body": "사용자 중심의 디자인을 할 수 있는 UI/UX 디자이너를 모집합니다.",
        "experience": "2년 이상",
        "education": "학사 이상",
        "stack": "Sketch, Figma, Adobe XD",
        "work_type": "정규직",
        "salary": "연봉 4,000만원 이상",
        "location": "대구광역시",
        "companyname": "Creative Designs Co."
      },
      {
        "key": 9,
        "title": "블록체인 개발자 모집",
        "startdate": "2025-04-01T00:00:00.000Z",
        "enddate": "2025-04-30T23:59:59.000Z",
        "resultdate": "2025-05-15T00:00:00.000Z",
        "pic1": "blockchain_pic1.jpg",
        "body": "블록체인 기술에 관심있는 개발자를 찾습니다. 스마트 컨트랙트 개발 경험자 우대.",
        "experience": "3년 이상",
        "education": "학사 이상",
        "stack": "Solidity, Ethereum, Web3.js",
        "work_type": "정규직",
        "salary": "연봉 6,000만원 이상",
        "location": "서울특별시",
        "companyname": "Blockchain Innovators"
      },
      {
        "key": 10,
        "title": "네트워크 보안 전문가 채용",
        "startdate": "2025-05-01T00:00:00.000Z",
        "enddate": "2025-05-31T23:59:59.000Z",
        "resultdate": "2025-06-15T00:00:00.000Z",
        "pic1": "security_pic1.jpg",
        "body": "네트워크 보안 및 침입 탐지 시스템 구축 경험이 있는 전문가를 모집합니다.",
        "experience": "5년 이상",
        "education": "학사 이상",
        "stack": "Cisco, Palo Alto, Wireshark",
        "work_type": "정규직",
        "salary": "연봉 7,500만원 이상",
        "location": "수원시",
        "companyname": "Secure Networks Ltd."
      },
      {
        "key": 11,
        "title": "게임 프로그래머 모집",
        "startdate": "2025-06-01T00:00:00.000Z",
        "enddate": "2025-06-30T23:59:59.000Z",
        "resultdate": "2025-07-15T00:00:00.000Z",
        "pic1": "game_pic1.jpg",
        "body": "3D 게임 엔진 경험이 있는 게임 프로그래머를 찾습니다. 물리 엔진 개발 경험자 우대.",
        "experience": "4년 이상",
        "education": "학사 이상",
        "stack": "C++, Unity, Unreal Engine",
        "work_type": "정규직",
        "salary": "연봉 5,500만원 이상",
        "location": "성남시",
        "companyname": "Game Masters Studio"
      },
      {
        "key": 12,
        "title": "데이터 엔지니어 채용",
        "startdate": "2025-07-01T00:00:00.000Z",
        "enddate": "2025-07-31T23:59:59.000Z",
        "resultdate": "2025-08-15T00:00:00.000Z",
        "pic1": "data_eng_pic1.jpg",
        "body": "대용량 데이터 처리 및 파이프라인 구축 경험이 있는 데이터 엔지니어를 모집합니다.",
        "experience": "3년 이상",
        "education": "학사 이상",
        "stack": "Apache Spark, Kafka, Airflow",
        "work_type": "정규직",
        "salary": "연봉 6,000만원 이상",
        "location": "서울특별시",
        "companyname": "Big Data Solutions"
      }
];

const studyboards = [
    {
      "title": "알고리즘 스터디 모집",
      "body": "코딩 테스트 준비를 위한 알고리즘 스터디원을 모집합니다. 주 2회 온라인 모임.",
      "pic1": "algorithm_study.jpg",
      "pic2": "coding_test.jpg"
    },
    {
      "title": "React 스터디 그룹",
      "body": "React와 관련 라이브러리를 함께 공부할 스터디원을 찾습니다. 초보자 환영!",
      "pic1": "react_logo.jpg",
      "pic2": "study_group.jpg"
    },
    {
      "title": "데이터 사이언스 입문 스터디",
      "body": "Python을 이용한 데이터 분석 기초부터 머신러닝까지 함께 공부해요.",
      "pic1": "data_science.jpg",
      "pic2": "python_logo.jpg"
    },
    {
      "title": "클라우드 자격증 준비 모임",
      "body": "AWS 자격증 취득을 목표로 하는 스터디입니다. 주 1회 오프라인 모임.",
      "pic1": "aws_cert.jpg",
      "pic2": "cloud_computing.jpg"
    },
    {
      "title": "프론트엔드 포트폴리오 스터디",
      "body": "함께 프로젝트를 진행하며 포트폴리오를 만들어가는 스터디입니다.",
      "pic1": "portfolio.jpg",
      "pic2": "frontend_tech.jpg"
    }
];

async function seedTest() {
  try {

    // 채용 공고 데이터 삽입
    await RecruitmentNoticeInfo.bulkCreate(recruitmentNotices);
    console.log('Recruitment notices inserted successfully');

    // 스터디 데이터 삽입
    await Studyboard.bulkCreate(studyboards);
    console.log('Studyboards inserted successfully');

    console.log('Database seeding completed');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await sequelize.close();
  }
}

seedTest();