const express = require('express');
const router = express();
const {registerUser, loginUser , currentUser,getUsers} = require('../controllers/userController');

const validateToken = require("../middleware/validateTokenHandler");

const basePath = '/user';

router.post(`${basePath}/register`, registerUser);
router.post(`${basePath}/login`, loginUser);

router.get(`${basePath}/userlists`, getUsers);
router.get(`${basePath}/current`,validateToken,currentUser);


exports.default = (app) => {
    app.use('/api', router);
};

