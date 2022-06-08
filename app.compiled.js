"use strict";

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var express = require('express');

var app = express();
var port = process.env.HTTP_PORT || 4001;

var mysql = require("mysql");

var dotenv = require('dotenv');

var bodyParser = require('body-parser');

var jsonParser = bodyParser.json();
dotenv.config();
app.use(express["static"](_path["default"].join(__dirname, 'fe-app', 'build')));
var db = mysql.createConnection({
  host: process.env.HOST,
  port: process.env.PORT,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
});
db.connect(function (err) {
  if (err) {
    console.log(err.message);
    return;
  }

  console.log("Database connected");
});
app.get('/', function (req, res) {
  res.send('Hello World!');
}); // ADD new contact

app.post('/contacts', jsonParser, function (req, res) {
  var data = {
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email
  };
  var sqlQuery = "INSERT INTO contacts SET ?";
  var query = db.query(sqlQuery, data, function (err, results) {
    if (err) throw err;
    res.send(results);
  });
}); // UPDATE contact

app.put('/contacts/:userId', jsonParser, function (req, res) {
  var contactItem = req.body;
  var sql = "UPDATE contacts SET name = ?, phone = ?, email = ? WHERE id = ?";
  db.query(sql, [contactItem.name, contactItem.phone, contactItem.email, contactItem.id], function (err, rows, fields) {
    if (!err) res.send(rows);else console.log(err);
  });
}); // DELETE contact

app["delete"]('/contacts/:userId', jsonParser, function (req, res) {
  var id = req.params.userId;
  var sql = "DELETE FROM contacts WHERE id = ?";
  db.query(sql, [id], function (error, results, fields) {
    if (error) {
      return console.error(error.message);
    }

    res.send(results);
    console.log('Deleted Row(s):', results.affectedRows);
  });
}); // GET single contact

app.get('/contacts/:userId', function (req, res) {
  var id = req.params.userId;
  var sqlQuery = "SELECT * FROM contacts WHERE id = ?";
  db.query(sqlQuery, [id], function (err, rows, fields) {
    if (!err) res.send(rows[0]);else console.log(err);
  });
}); // GET list of contacts

app.get('/contacts', function (req, res) {
  var sqlQuery = "SELECT * FROM contacts";
  db.query(sqlQuery, function (err, rows, fields) {
    if (!err) res.send(rows);else console.log(err);
  });
});
app.listen(port, function () {
  console.log("Example app listening on port ".concat(port));
});
