const express = require('express');
const cors = require('cors');
const dotenv = require("dotenv");
const mysql = require('mysql2/promise');
const Ajv = require("ajv")


const app = express();
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
dotenv.config();
const ajv = new Ajv() // options can be passed, e.g. {allErrors: true}


// app.use((req, res, next) => {
//     express.json()(req, res, err => {
//       if (err) {
//         return res.status(400).send({
//           message: "Could not parse JSON"
//         });
//       }
//       next();
//     })
//   });
  
// Create an async pool object with promisified methods

const schema = {
    type: "object",
    properties: {
      foo: {type: "integer"},
      bar: {type: "string"}
    },
    required: ["foo"],
    additionalProperties: false
  }
  const validate = ajv.compile(schema)

  // Test Data für Validation
  const data = {
    foo: 1,
    bar: "abc"
  }

  
const valid = validate(data)
if (!valid) console.log(validate.errors)

  
const pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
})



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
    console.log(req.body);
    res.send(req.body);
  });

  


app.listen(3000,() => console.log("Example REST gestartet"));