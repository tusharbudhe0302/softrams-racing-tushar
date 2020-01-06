const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
var hsts = require('hsts');
const path = require('path');
var xssFilter = require('x-xss-protection');
var nosniff = require('dont-sniff-mimetype');
const request = require('request');

var port = process.env.PORT || 8000;

const app = express();

app.use(cors());
app.use(express.static('assets'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.disable('x-powered-by');
app.use(xssFilter());
app.use(nosniff());
app.set('etag', false);
app.use(
  helmet({
    noCache: true
  })
);
app.use(
  hsts({
    maxAge: 15552000 // 180 days in seconds
  })
);

app.use(
  express.static(path.join(__dirname, 'dist/softrams-racing'), {
    etag: false
  })
);

app.get('/api/members', (req, res) => {
  request('http://localhost:3000/members', (err, response, body) => {
    if (response.statusCode <= 500) {
      res.send(body);
    }
  });
});

app.get('/api/members/:id', (req, res) => {
  request('http://localhost:3000/members/:id', (err, response, body) => {
    if (response.statusCode <= 500) {
      res.send(body);
    }
  });
});

app.get('/api/teams', (req, res) => {
  request('http://localhost:3000/teams', (err, response, body) => {
    if (response.statusCode <= 500) {
      res.send(body);
    }
  });
});

// Submit Form!
app.post('/api/members', (req, res) => {
  request.post({
    url: 'http://localhost:3000/members',
    body: req.bodyParser.json(),
    json: true
  }, (err, response, body) => {
    if (response.statusCode <= 500) {
      res.send(body);
    }
  });
});
app.put('/api/members/:id', (req, res) => {
  request.put({
    url: 'http://localhost:3000/members/:id',
    body: req.bodyParser.json(),
    json: true
  }, (err, response, body) => {
    if (response.statusCode <= 500) {
      res.send(body);
    }
  });
});
app.delete('/api/members/:id', (req, res) => {
  request.delete({
    url: 'http://localhost:3000/members/:id',
    body: req.bodyParser.json(),
    json: true
  }, (err, response, body) => {
    if (response.statusCode <= 500) {
      res.send(body);
    }
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/softrams-racing/index.html'));
});

app.listen(port, () => {
  console.log('Vrrrum Vrrrum! Server starting!');
});
