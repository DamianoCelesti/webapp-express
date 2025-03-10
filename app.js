// importo il modulo express
const express = require('express')
// creo una funzione che crea un app express che mi permette di definire rotte
const app = express()
// porta del server importando da env
const port = process.env.PORT



// importo il router dei movies
const moviesRouter = require('./routers/movies');



// middleware per abilitare il parsing del JSON
app.use(express.json());




// definisco route per la homepage
app.get('/', (req, res) => { // parametri della funzione request(richiesta del client) response(risposta del server invia al client)
    res.send("Server movies");
})

// utilizziamo la rotta dei movies andando a definire la parte iniziale delle rotte
app.use("/movies", moviesRouter)



// avvia il server e lo mette in ascolto sulla porta
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})