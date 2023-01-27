const express = require("express");
const {isAdminAuth} = require("../utils/authorization");
const{newBags, deleteBags} = require("../controllers/Addbags");

const router = express.Router();

router.post("/admin/:userid",isAdminAuth,newBags);
router.delete("/admin/:userid/:productid", isAdminAuth,deleteBags);

module.exports = router

