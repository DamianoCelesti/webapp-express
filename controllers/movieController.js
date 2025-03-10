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
    const id = parseInt(req.params.id);

    // Query per ottenere il movie specifico
    const detailMovie = 'SELECT * FROM movies WHERE id = ?';

    const reviewsMovie = 'SELECT * FROM reviews WHERE movie_id = ?';

    connection.query(detailMovie, [id], (err, movieResults) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });

        if (movieResults.length === 0) return res.status(404).json({ error: 'Movies not found' });

        // res.json(results[0]); // Restituiamo solo il movie specifico
        const movie = movieResults[0];
        connection.query(reviewsMovie, [id], (err, reviewsResults) => {
            if (err) return res.status(500).json({ error: 'Database query failed' });
            // Aggiorno l'oggetto movie con le review
            movie.reviews = reviewsResults;
            // ritorniamo l'oggetto completo
            res.json(movie);
        });
    });
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