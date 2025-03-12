// importo il modulo express
const express = require('express')
// creo una funzione che crea un app express che mi permette di definire rotte
const app = express()
// porta del server importando da env
const port = process.env.PORT
// importiamo cors
const cors = require('cors')



// importo il router dei movies
const moviesRouter = require('./routers/movies');
// importo il middleware delle gestione errori server
const errorsHandler = require('./middlewares/errorsHandler');
// importo il middleware notfound 404
const notFound = require('./middlewares/notFound');
// importo il middleware imgPath
const imgPath = require('./middlewares/imagePath');


// middleware per abilitare il parsing del JSON
app.use(express.json());

// middleware di cors
app.use(cors({ origin: process.env.FE_APP }))

// imgs statiche
app.use(express.static('public'));

// utilizzo middleware delle immagini
app.use(imgPath);


// definisco route per la homepage
app.get('/', (req, res) => { // parametri della funzione request(richiesta del client) response(risposta del server invia al client)
    res.send("Server movies");
})

// utilizziamo la rotta dei movies andando a definire la parte iniziale delle rotte
app.use("/movies", moviesRouter)



// utilizzo gestione errori server alla fine dopo le route

app.use(errorsHandler);

// utilizzo middleware di gestione not found 404

app.use(notFound);

// avvia il server e lo mette in ascolto sulla porta
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})