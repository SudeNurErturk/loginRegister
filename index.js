const express = require("express");
const db = require("./routes/db.config");
const app = express();
const dotenv =require("dotenv").config();
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 5001;
app.use("/js",express.static(__dirname +"/public/js"))
app.use("/css",express.static(__dirname +"/public/css"))
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(cookieParser());
app.use(express.json());
db.connect((err) =>{
    if(err) throw err;
    console.log("database connected");
})
app.use("/", require("./routes/pages"));
app.use("/api", require("./controllers/auth")); // api/register
app.listen(PORT)