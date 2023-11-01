const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");

app.use(cors());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

app.use("/client", express.static(path.resolve(__dirname + "/../client/")));

// Make server
var server;
var port = 5000;

// Page listeners
var router = require("./router.js");
router(app);

// Service listeners

// Start web server

server = app.listen(port, function(err) {
    if (err) throw err;

    console.log("Server starting on port: " + port);
})