const asyncHandler = require("express-async-handler");
const { sequelize } = require("../../config/db");
const bcrypt = require("bcrypt");
const User = require('../../models/User');
const { Sequelize } = require("sequelize");

/**
 * 내 정보 가져오기(마이페이지)
 * GET /api/my
 */
const getProfile = asyncHandler(async (req, res) => {
    try {
        const id= req.user.userID
        const user = await User.findByPk(id);
        if (user) {
            res.status(200).json({ id: user.id, name: user.name, age: user.age });
        } else {
            res.status(404).json({ error: 'User not found' });
        }

    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

// GET /api/profile/name
const getUserName = asyncHandler(async (req, res) => {
    try {
        const id = req.user.userID;
        const user = await User.findByPk(id);
        if (user) {
            res.status(200).json({ name: user.name });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'server error' });
    }
});

// PUT /api/profile/edit
const updateProfile = asyncHandler(async (req, res) => {
    try {
        const id = req.user.userID;  // 모델의 primary key 필드명 사용
        const { name, password, birth, gender, job } = req.body;

        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).send('User not found');
        }

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
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

// DELETE /api/profile
const deleteProfile = asyncHandler(async (req, res) => {
    try {
        const id = req.user.userID;  // 모델의 primary key 필드명 사용
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).send('User not found');
        }
        
        await user.destroy();
        res.status(200).send('Delete Success');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

module.exports = { getProfile, updateProfile, deleteProfile, getUserName };
