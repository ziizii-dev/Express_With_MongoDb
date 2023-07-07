const express = require('express');
const router = express();
const {registerUser, loginUser , currentUser,getUsers} = require('../controllers/userAuthController');
const {updateUserInfo,deleteUser,userPasswordChange} = require('../controllers/userController');
const validateToken = require("../middleware/validateTokenHandler");

const basePath = '/user';

router.post(`${basePath}/register`, registerUser);
router.post(`${basePath}/login`, loginUser);

router.get(`${basePath}/userlists`, getUsers);
router.get(`${basePath}/current`,validateToken,currentUser);
router.post(`${basePath}/update/:id`,updateUserInfo);
router.delete(`${basePath}/delete/:id`,deleteUser);
router.put(`${basePath}/password/change`,validateToken,userPasswordChange)
exports.default = (app) => {
    app.use('/api', router);
};

