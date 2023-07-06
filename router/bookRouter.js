const express = require('express');
const router = express();
const {createBook} = require('../controllers/bookController');

// const validateToken = require("../middleware/validateTokenHandler");

const basePath = '/book';

router.post(`${basePath}/create`, createBook);
// router.post(`${basePath}/login`, loginUser);

// router.get(`${basePath}/userlists`, getUsers);
// router.get(`${basePath}/current`,validateToken,currentUser);


exports.default = (app) => {
    app.use('/api', router);
};

