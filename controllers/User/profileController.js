const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require('../../models/User/user');
const Freeboard = require('../../models/FreeBoard/freeboard');
const Studyboard = require('../../models/StudyBoard/studyboard');
const Company = require('../../models/Company/company');
const Scrap = require('../../models/Scrap/scrap');

// GET /api/profile
const getProfile = asyncHandler(async (req, res) => {
    const id = req.user.userID;  // 모델의 primary key 필드명 사용
    const user = await User.findByPk(id, {
        attributes: { exclude: ['password'] },
        include: [{
            model: Scrap,
            attributes: ['companyID'],
            include: [{
                model: Company,
                attributes: ['companyName', 'establish', 'logo']
            }]
        }]
    });

    if (!user) {
        res.status(404).send('User not found');
    }

    const email = user.email;

    const freeboardPosts = await Freeboard.findAll({
        where: { id: email }
    });
    
    const studyboardPosts = await Studyboard.findAll({
        where: { id: email }
    });
    
    res.status(200).json({
        user,
        freeboardPosts,
        studyboardPosts
    });
});

// PUT /api/profile/edit
const updateProfile = asyncHandler(async (req, res) => {
    const id = req.user.userID;  // 모델의 primary key 필드명 사용
    const { name, password, birth, gender, job } = req.body;

    // if (email) { // 이메일 중복 확인
    //     const existingUser = await User.findOne({ where: { email } });
    //     if (existingUser && existingUser.userID !== id) {
    //         return res.status(400).send('Email already in use');
    //     }
    // }

    const user = await User.findByPk(id);
    if (!user) {
        res.status(404).send('User not found');
    } else { // 수정을 한 속성들만 업데이트, 안 한 속성들은 그대로 유지
        // if (email) user.email = email; 이메일은 변경 안됨
        if (name) user.name = name;
        if (birth) user.birth = birth;
        if (gender) user.gender = gender;
        if (job) user.job = job;
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
        }
        await user.save();
        res.status(200).send('Edit Success');
    }
});

// DELETE /api/profile
const deleteProfile = asyncHandler(async (req, res) => {
    const id = req.user.userID;  // 모델의 primary key 필드명 사용
    const user = await User.findByPk(id);
    if (!user) {
        res.status(404).send('User not found');
    } else {
        await user.destroy();
        res.status(200).send('Delete Success');
    }
});

module.exports = { getProfile, updateProfile, deleteProfile };