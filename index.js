const urlApi = 'http://localhost:3000/filmes'; //Atribuindo a uma const o endpoint 
const cards = document.getElementById('card');
let editar = false;
let idEditar = 0;
let visualizado = false;

const getFilmes = async () => {
  const response = await fetch(urlApi); //Requisição do tipo Get acessando a Api através do fetch
  const data = await response.json();//Resposta convertida em json /Arquivo filmes.router.js "res.send(filmes)"
  
  data.map((item) => {//Iteração para listar na tela
    console.log(item)
    cards.insertAdjacentHTML('beforeend', `
    <div class="container-card">      
        <button class="btnDel" onclick="filmeAssistido(${item.id})">Filme Assistido</button>
        <img id="cardImage" width="200" src=${item.url} />
        <p id="cardName">${item.nome.toUpperCase()}</p>      
      <div class="info" >
        <div class="infoGen">
          <p > <span>Gênero: </span>${item.genero.toUpperCase()}</p>
          <div class="infoButton">  
            <button class="btnEdit" onclick="putFilme(${item.id})">Editar</button>
            <button class="btnDel" onclick="delFilme(${item.id})">Deletar</button>
          </div>  
        </div>
        <div class="infoNota">  
          <p class="nota">${item.nota}</p> 
          <p class="notaAvaliada">Avaliação<p>
        </div>  
      </div>  
    </div>
    `)
  })
}
getFilmes();
console.log(getFilmes())

const submitForm = async (evento) => {
  evento.preventDefault();

  let nome = document.querySelector("#nome");
  let url = document.getElementById("url");
  let genero = document.getElementById("dropdown");
  let nota = document.querySelector("#nota");

  const filme = {//Objeto com os valores digitados pelo usuário
    nome : nome.value,
    url: url.value,
    genero: genero.value,
    nota: nota.value,
    
  };
  
  if(!editar ) { //Condição que define se será POST ou PUT
   
    const request = new Request(`${urlApi}/add`, {
      method: 'POST', //Método de envio de dados
      body: JSON.stringify(filme), //Onde fica o conteúdo convertido em formato json
      headers: new Headers({ //Informação do tipo de conteúdo
        'Content-Type': 'application/json'
        
      })
      
    })
    const response = await fetch(request); //Atribui-se ao fetch as configuração da requisição
    const result = await response.json(); //Resultado do fetch em formato json

    if(result) {
      getFilmes();
    }

  } else {
    const request = new Request(`${urlApi}/${idEditar}`, {
      method: 'PUT',
      body: JSON.stringify(filme),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })

    const response = await fetch(request);
    const result = await response.json();

    if(result) {
      getFilmes();
    }
  }
  //Limpa input
  nome.value = '';
  url.value = '';
  genero.value = '';
  nota.value = '';

  // Limpa a lista 
  cards.innerHTML = '';
}


const getId =  async (id) => {//Função que retorna um único filme
  const response =  await fetch(`${urlApi}/${id}`);
  return filme = response.json();
}

const putFilme = async (id) => {
  editar = true;//Caso clicar no botão
  idEditar = id; 
  
  const filme = await getId(id);

  let nomeParaEditar = document.querySelector("#nome");
  let urlParaEditar = document.getElementById("url");
  let generoParaEditar = document.getElementById("dropdown");
  let notaParaEditar = document.querySelector("#nota");
 
  nomeParaEditar.value = filme.nome;
  urlParaEditar.value = filme.url;
  generoParaEditar.value = filme.genero;
  notaParaEditar.value = filme.nota

}
 
const delFilme = async (id) => {
  
  const request = new Request(`${urlApi}/${id}`, {
    method: 'DELETE',
  })
  const response = await fetch(request);
  const data = await response.json();
  console.log(data.message)
  
  cards.innerHTML = '';
  getFilmes();
}
