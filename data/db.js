// Importo il modulo per poter gestire MySQL
const mysql = require('mysql2');

// Creo una connessione al db usando le variabili d'ambiente
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// avvio la connessione al db
connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL!');
});

// esporto
module.exports = connection;