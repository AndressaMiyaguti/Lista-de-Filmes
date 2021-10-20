const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json()) //define que o express vai trabalhar com json(utilização de middleware)
app.use(cors())//Para utilizar o cors

const filmesRouter = require('./routers/filmes.routers'); //Importação das rotas

app.use('/filmes',filmesRouter)//Todas as rotas acessadas no arquivo, aparecerão na rota /filmes

app.get('/',(req, res) =>{
  res.send('ola');
})
/*  */
const port =3000;

app.listen( port, ()=> {
  console.log(`O servidor está rodando na porta http://localhost:${port}/`)
})






