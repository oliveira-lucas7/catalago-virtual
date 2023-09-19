import "./global.css";
import { Avatar, Button, Container } from "@mui/material";
import { useEffect, useState } from "react";
import Filmes from "./components/Filmes";
import Header from "./components/header";
import Banner from "./components/banner";
import Card from "./components/card"

function App() {

  const [ filmes, setFilmes ] = useState();
  const [ erro, setErro ] = useState();
  const [ excluir, setExcluir ] = useState();

  useEffect(() => {
    fetch( process.env.REACT_APP_BACKEND + "filmes",//O fetch manda uma requisição para url digitada, futuramente será o link do banco de dados feitos por nós
    {method: "GET",//A requisição irá ser do método post, ou seja, por baixo dos panos (Existe 5 métodos de requisição)
    headers: {
      'Content-Type': 'application/json'
    },
  })
    .then((resposta) => resposta.json())//Então se tudo deu certo pega a resposta e transforma em JSON
    .then((json) => { setFilmes( json ) } )
    .catch((erro) => { setErro(true)})//Qualquer tipo de erro irá cair no cath
  }, [])
  
  function Excluir (evento, id){
    evento.preventDefault();

    fetch( process.env.REACT_APP_BACKEND + "filmes",//O fetch manda uma requisição para url digitada, futuramente será o link do banco de dados feitos por nós
      {
        method: "DELETE",//A requisição irá ser do método post, ou seja, por baixo dos panos (Existe 5 métodos de requisição)
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(//O corpo da requisição será essa
          {
            id: id,
          }
        )
      })
      .then((resposta) => resposta.json())//Então se tudo deu certo pega a resposta e transforma em JSON
      .then((json) => {
        const novaLista = filmes.filter ((filme) => filme._id !== id);
        setFilmes (novaLista)})
      .catch((erro) => { setErro(true) })
  }
    

  return (
    <>
      <Header></Header>
      <Banner></Banner>
      <Card></Card>
      <Container sx={{
        display: "flex",
        flexFlow: "row",
        flexWrap: "wrap",
        gap: "2rem"
      }}>
      { filmes && (
        filmes.map( (filme, index ) => ( //O map mapeia todos os filmes cadastrados, e inseri o valores deles na tela
          <Filmes 
            imagem={filme.imagem}
            titulo={filme.titulo}
            descricao={filme.descricao}
            categoria={filme.categoria}
            ano={filme.ano}
            duracao={filme.duracao}
            excluir={ (e) => Excluir( e, filme._id ) }
            id={filme._id}
          />
        ) )
      )}
      </Container>
    </>
  );
}

export default App;
//quando precisar importar um componente já feito, primeiro escreve ele como componente para importar automaticamente e depois copia e cola o componente do site