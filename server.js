const express = require("express");
// const errorHandler = require("./middleware/errorhandler");
const dotenv = require ("dotenv").config();
const connectDB = require("./config/dbConnection");
connectDB();
const app = express();
const port = 4006;
const glob = require('glob');
//const port = process.env.PORT || 5000;
app.use(express.json());
const routes = glob.sync(__dirname + '/router/*.js');
routes.forEach((item) => {
    //console.log(item);
    require(item).default(app);
});
app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
});
