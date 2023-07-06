const express = require('express');
const router = express();
const {createAuthor} = require('../controllers/authorController');
// const validateToken = require("../middleware/validateTokenHandler");
const basePath = '/author';

router.post(`${basePath}/create`, createAuthor);


exports.default = (app) => {
    app.use('/api', router);
};

