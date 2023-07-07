const express = require('express');
const router = express();
const {getBooks,createBook,getBookDetail,updateBook,deleteBook} = require('../controllers/bookController');

// const validateToken = require("../middleware/validateTokenHandler");

const basePath = '/book';

router.post(`${basePath}/create`, createBook);
router.get(`${basePath}/detail/:id`,getBookDetail);
router.put(`${basePath}/update/:id`,updateBook);
router.delete(`${basePath}/delete/:id`,deleteBook);
router.get(`${basePath}/lists`,getBooks);



exports.default = (app) => {
    app.use('/api', router);
};

