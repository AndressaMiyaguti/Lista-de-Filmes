const express = require('express');
const router = express.Router();

const lista = [
  {
    id: Date.now(),
    nome: "Naruto",
    url: "https://viciados.net/wp-content/uploads/2020/02/Naruto-Cl%C3%A1ssico-e-Naruto-Shippuden-fillers.jpg",
    genero: "Anime",
    nota: "9",
  }
]

router.get('/',(req, res) =>{ //Retorna a lista de filmes
  res.send(lista);
})

router.get('/:id', (req, res) => {//Retorna um único filme, de acordo com o id. Usamos para a edição e exclusão.
  const idParam = req.params.id; //Id via parâmetro
  const index = lista.findIndex(filme => filme.id == idParam);//findIndex - retorna o índice do elemento de acordo com a regra estipulada.
  
  const filmes = lista[index];    
  res.send(filmes);      
}) 

router.put('/:id', (req, res) =>{
  const filmeEditado = req.body;
  const id = req.params.id;
  
  let filmeCadastrado = lista.find((filme) => filme.id == id);

  filmeCadastrado.nome = filmeEditado.nome;
  filmeCadastrado.url = filmeEditado.url;
  filmeCadastrado.genero = filmeEditado.genero;
  filmeCadastrado.nota = filmeEditado.nota;

  res.send({
    message:`Filme ${filmeCadastrado.nome} atualizado com sucesso`,
    data: filmeCadastrado
  })

})

router.post('/add', (req, res) => {
  const cadastro = req.body;
  cadastro.id = Date.now();
  lista.push(cadastro);
  res.status(201).send({ //É esperado de resposta um json
    mensagem: 'Filme Cadastrado com Sucesso',
    data: cadastro,
  })
})

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  const index = lista.findIndex((filme) => filme.id == id);
  lista.splice(index, 1);

  res.send({
    message: 'Excluída com sucesso'
  })
})

module.exports = router;

