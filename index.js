'use strict';

const express = require('express');
const cors = require('cors');
const multer = require('multer');

const app = express();

app.use(cors());

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.get('/hello', function (req, res) {
  res.json({
    greetings: 'Hello, API'
  });
});

// File Metadata API
app.post(
  '/api/fileanalyse',
  multer().single('upfile'),
  function (req, res) {
    res.json({
      name: req.file.originalname,
      type: req.file.mimetype,
      size: req.file.size
    });
  }
);

// Start server LAST
app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});