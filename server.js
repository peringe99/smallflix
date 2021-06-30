const mongoose = require('mongoose');
const express = require('express')
var app = express();
const authRoutes = require("./routes/auth.routes");

app.get('/', function (req, res) {
    res.send('Hello World');
});

app.listen(8000, function () {
    console.log('Listening to port 8000');
})

