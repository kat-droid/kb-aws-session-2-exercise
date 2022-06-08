import path from 'path'
const express = require('express')
const app = express()
const port = process.env.HTTP_PORT || 4001
const mysql = require("mysql")
const dotenv = require('dotenv')
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

dotenv.config()

app.use(express.static(path.join(__dirname, 'fe-app', 'build')));

const db = mysql.createConnection({
  host: process.env.HOST,
  port: process.env.PORT,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

db.connect(err => {
  if (err) {
    console.log(err.message);
    return;
  }
  console.log("Database connected");
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// ADD new contact
app.post('/contacts', jsonParser, (req, res) => {
  let data = {
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email
  };
  let sqlQuery = "INSERT INTO contacts SET ?";

  let query = db.query(sqlQuery, data, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

// UPDATE contact
app.put('/contacts/:userId', jsonParser, (req, res) => {
  let contactItem = req.body;
  let sql = "UPDATE contacts SET name = ?, phone = ?, email = ? WHERE id = ?";

  db.query(sql, [contactItem.name, contactItem.phone, contactItem.email, contactItem.id], (err, rows, fields) => {
    if (!err)
      res.send(rows);
    else
      console.log(err);
  })
});

// DELETE contact
app.delete('/contacts/:userId', jsonParser, (req, res) => {
  var id = req.params.userId;
  let sql = "DELETE FROM contacts WHERE id = ?";

  db.query(sql, [id], (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    }
    res.send(results);
    console.log('Deleted Row(s):', results.affectedRows);
  });
});

// GET single contact
app.get('/contacts/:userId', (req, res) => {
  var id = req.params.userId;
  let sqlQuery = "SELECT * FROM contacts WHERE id = ?";

  db.query(sqlQuery, [id], (err, rows, fields) => {
    if (!err)
      res.send(rows[0]);
    else
      console.log(err);
  })
})

// GET list of contacts
app.get('/contacts', (req, res) => {
  let sqlQuery = "SELECT * FROM contacts";
  db.query(sqlQuery, (err, rows, fields) => {
    if (!err)
      res.send(rows);
    else
      console.log(err);
  })
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})