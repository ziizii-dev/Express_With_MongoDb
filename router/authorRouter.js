const express = require('express');
const router = express();
const {createAuthor,getAuthorList,getAuthorDetail,updateAuthor,deleteAuthor} = require('../controllers/authorController');
// const validateToken = require("../middleware/validateTokenHandler");
const basePath = '/author';

router.post(`${basePath}/create`, createAuthor);
router.get(`${basePath}/lists`,getAuthorList);
router.get(`${basePath}/detail/:id`,getAuthorDetail);
router.put(`${basePath}/update/:id`,updateAuthor);
router.delete(`${basePath}/delete/:id`,deleteAuthor)


exports.default = (app) => {
    app.use('/api', router);
};

