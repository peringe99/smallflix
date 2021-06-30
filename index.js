const mongoose = require('mongoose');
const express = require('express')
var app = express();

app.get('/', function (req ,res) {
    res.send('Hello World');
});

app.listen(8000, function () {
    console.log('Listening to port 8000');
})

await mongoose.connect('mongodb://localhost/my_database', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});