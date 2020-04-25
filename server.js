'use strict';

var express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');

// require and use "multer"...
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname + '-' + Date.now())
  }
})

var upload = multer({ storage: storage })
var app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.get('/hello', function (req, res) {
  res.json({ greetings: "Hello, API" });
});

app.post('/api/fileanalyse', upload.single('upfile'), function (req, res) {
  const { file } = req;
  if (file) {
    res.status(200).json({ name: file.originalname, type: file.mimetype, size: file.size });
  }
  else {
    res.status(400).json({ error: "upload failed" });
  }
});



app.listen(process.env.PORT || 3009, function () {
  console.log('Node.js listening ...');
});
