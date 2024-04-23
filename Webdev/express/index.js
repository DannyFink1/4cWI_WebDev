const express = require('express');
const cors = require('cors');
const dotenv = require("dotenv");
const mysql = require('mysql2/promise');
const Ajv = require("ajv");
const jwt = require("jsonwebtoken");


const app = express();
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
dotenv.config();
const ajv = new Ajv() // options can be passed, e.g. {allErrors: true}
const TOKEN_SECRET = process.env.TOKEN_SECRET;


// Create an async pool object with promisified methods

const schema = {
    type: "object",
    properties: {
      username: {type: "string"},
      password: {type: "string"}
    },
    required: ["username", "password"],
    additionalProperties: false
  }
  const validate = ajv.compile(schema)


  
const pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
})


// Token für User erstellen
function generateAccessToken(username) {
    return jwt.sign(username, TOKEN_SECRET, { expiresIn: '1800s' });
  }
  
  //Token Überprüfung
  function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    console.log(req.headers);
    console.log(authHeader);
    const token = authHeader;
    console.log(token);
    if (!token) return res.status(401).json({ message: "kein token gefunden", status: 401 })
    jwt.verify(token, TOKEN_SECRET, (err, user) => {
      if (err) return res.status(403).json({ message: "falscher token", status: 403 })
      req.user = user
      next()
    })
  }

async function query(sql, params) {
    try {
        const [rows, fields] = await pool.execute(sql, params);
        return rows;
    } catch (error) {
        throw error;
    }
}


async function checkConnection() {
    try {
        // Execute a simple query to check the connection
        await pool.query('SELECT 1');
        console.log('Connected to the MySQL server.');
    } catch (err) {
        console.error('Error connecting to MySQL server:', err);
    } finally {
        // Close the connection pool
    }
}
// Call the function to check the connection
checkConnection();


3
app.get('/', (req,res)=>{
    res.send("hallo ihr schueler");
});


// Abfrage mit Parameter  /hello?name=xxx
app.get('/hello', (req, res) => {
    res.send("hallo mein query ist:" + req.query.name);
  });
// Abfrage mit Platzhalter in /hello/markus
app.get('/hello/:name', (req, res) => {
    console.log(req.params.name);
    res.send("hallo mein Name ist auch " + req.params.name);
});

app.get('/todos', async function (req, res) {
    try {
        const sql = "SELECT * FROM todos";
        var todos = await query(sql);
        console.log(todos);
        if (todos.length == 0) {
            res.status(404).json({
                status: 404,
                message: "keine Todos gefunden"
            });
            return;
        }
        //console.log(todos);
        var row = todos.length;
        res.status(200).json({
            status: 200,
            todos,
            row
        });
        return;
    } catch (err) {
        res.status(500).send({
            status: 500,
            message: err
        });
    }
    return;
});



// Abfrage mit Platzhalter in /hello/markus
app.post('/hello/body', function (req, res) {
    const valid = validate(req.body)
    if (valid) {
        console.log(req.body);
    } else {
        console.log(validate.errors);
    }
    res.send(req.body);
  });

  app.get('/user/login', async function (req, res) {

    //Validation
    const valid = validate(req.body)
    if (!valid) {
        console.log(validate.errors);
        return res.status(400).json({
            status: 400,
            message: "Wrong request!"
          })
    } else {
    
    let sql = "select username, password from users where username = ? and password = ?";
    let values = [req.body.username, req.body.password];
    try {
      const results = await query(sql, values);
      if (results.length === 0) {
        return res.status(409).json({ status: 409, message: "username oder password falsch" });
      }
      const token = generateAccessToken({ username: req.body.username });
      
      let timestamp = new Date();
      console.log(timestamp);

      let sql2 = "UPDATE users SET lastLogin  = ? WHERE users.username = ? and users.password = ?";
      values = [timestamp,req.body.username, req.body.password];
      let results2 = await query(sql2, values);
      console.log(results2);


      return res.status(201).json({
        token: token,
        status: 201,
        message: "erfolgreich eingeloggt und token erstellt"
      })
    } catch (err) {
      console.error("Database error:", err);
      return res.status(500).json({ status: 500, message: "Datenbankfehler: " + err.message });
    }
}
  })
  
  app.get('/kunden', authenticateToken, async function (req, res) {
    let sql = "select * from todos";
    const results = await query(sql);
    res.send(results)

  });

  


app.listen(3000,() => console.log("Example REST gestartet"));