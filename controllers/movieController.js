const connection = require('../data/db');



//index
function index(req, res) {

    // query di richiesta movies
    const sql = 'SELECT * FROM movies';
    connection.query(sql, (err, movieResults) => {
        // se la query non va a buon fine
        if (err) return res.status(500).json({ error: 'Database query failed' });

        const movies = movieResults.map(movie => {
            return {
                ...movie,
                image: req.imagePath + movie.image
            }
        })

        res.json(movies); // se tutto funziona
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
            // aggiungiamo il valore path img dal middleware
            movie.image = req.imagePath + movie.image;
            // ritorniamo l'oggetto completo
            res.json(movie);
        });
    });
}




// store
function store(req, res, next) {

    const { title, director, abstract } = req.body;

    const imageName = `${req.file.filename}`;

    // creiamo la query
    const query = "INSERT INTO movies (title, director, image, abstract) VALUES (?,?,?,?)";

    // esegue query per mettere nel db
    connection.query(query,
        [title, director, imageName, abstract],
        (err, result) => {
            if (err) {
                console.log(err)
                return next(new Error("errore del server"));
            }
            res.status(201).json({
                status: "successo",
                message: "Movie creato con successo"
            });
        }
    )

}

// update
function update(req, res) {



}

// delete
function destroy(req, res) {

}


// inserimento nuova reviews
function storeReview(req, res) {

    // id preso dai parametri
    const { id } = req.params;
    // le altre info dal body
    const { text, name, vote } = req.body;

    const insertReviewSql = "INSERT INTO reviews (text, name, vote, movie_id) VALUES (?, ?, ?, ?)"

    // eseguiamo la query
    connection.query(insertReviewSql, [text, name, vote, id], (err, result) => {
        if (err) return res.status(500).json({ error: "Database query failed" });
        res.status(201);
        res.json({ message: "Review added", id: result.insertId });
    });
}



// esportiamo tutto
module.exports = { index, show, store, update, destroy, storeReview }