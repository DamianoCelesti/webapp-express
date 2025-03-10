const connection = require('../data/db');



//index
function index(req, res) {

    // query di richiesta movies
    const sql = 'SELECT * FROM movies';
    connection.query(sql, (err, results) => {
        // se la query non va a buon fine
        if (err) return res.status(500).json({ error: 'Database query failed' });
        res.json(results); // se tutto funziona
    });
}

//show
function show(req, res) {

}




// store
function store(req, res) {

}

// update
function update(req, res) {



}

// delete
function destroy(req, res) {

}

// esportiamo tutto
module.exports = { index, show, store, update, destroy }