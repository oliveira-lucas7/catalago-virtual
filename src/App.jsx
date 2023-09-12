import { Avatar, Button, Container } from "@mui/material";
import { useEffect, useState } from "react";
import Filmes from "./components/Filmes";

function App() {

  const [ filmes, setFilmes ] = useState();
  const [ erro, setErro ] = useState();

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

  return (
    <>
      <h1>Filmes</h1>
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
          />
        ) )
      )}
      </Container>
    </>
  );
}

export default App;
//quando precisar importar um componente já feito, primeiro escreve ele como componente para importar automaticamente e depois copia e cola o componente do site