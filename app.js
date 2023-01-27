const express = require("express");
const dotenv = require("dotenv");
dotenv.config({path: "./config/config.env"});
const cors = require("cors")

const auth = require( "./router/AddUser");
const router = require("./router/adminRoute");
const user = require("./router/userRoute");

const app = express();
app.use(express.json());
app.use(cors())

app.use("/api", auth);
app.use("/api", router);
app.use("/api", user);

app.use("/", (req,res)=>{
    res.status(200).send("my Api is working")
});


module.exports = app