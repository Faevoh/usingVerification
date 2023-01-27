const express = require("express");
const{getAllBags} = require("../controllers/Addbags");
const {Userverify,forgotPassword} = require("../controllers/AddUser")

const Router = express.Router();

Router.get("/user",getAllBags);
Router.post("/userVerify/:userid",Userverify);
// Router.post("/resetPassword",forgotPassword);



module.exports = Router