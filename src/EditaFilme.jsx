import { Alert, Autocomplete, Box, Button, Checkbox, Container, FormControl, FormControlLabel, Grid, TextField, Typography, Link } from '@mui/material'
import React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { Navigate, json, useNavigate, useParams } from 'react-router-dom';
import fundo from "./photos/fundo.webp"
import Header from "./components/header"

function EditaFilme() {

  document.body.style.backgroundImage = "url(" + fundo + ")";

  const { id } = useParams();// Parâmetro serve para pegar todas as informações de um objeto 

  console.log(id);

  const [nome, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const options = ["Computador com monitor", "Sem monitor"]
  const [ano, setAno] = useState("");
  const [duracao, setDuracao] = useState("")
  const [imagem, setImagem] = useState("");
  const [editar, setEditar] = useState(false);
  const [erro, setErro] = useState(false)
  const [cadastro, setCadastro] = useState(false)

  const [value, setValue] = React.useState(options[0]);
  const [inputValue, setInputValue] = React.useState('');

  useEffect(() => {
    const usuario = localStorage.getItem("usuario");
    fetch(process.env.REACT_APP_BACKEND + "produtos/" + usuario + "/" + id,//O fetch manda uma requisição para url digitada, futuramente será o link do banco de dados feitos por nós
      {
        method: "GET",//A requisição irá ser do método post, ou seja, por baixo dos panos (Existe 5 métodos de requisição)
        headers: {
          'Content-Type': 'application/json'
        },
      })
      .then((resposta) => resposta.json())//Então se tudo deu certo pega a resposta e transforma em JSON
      .then((json) => {
        if (!json.status) {
          setTitulo(json.titulo);
          setDescricao(json.descricao);
          setAno(json.ano);
          setDuracao(json.duracao);
          setImagem(json.imagem);
          setValue(json.categoria);
        }
        else {
          setErro("Filme não encontrado")
        }
      })
      .catch((erro) => { setErro(true) })
  }, []);

  function Editar(evento) {
    evento.preventDefault();

    fetch(process.env.REACT_APP_BACKEND + "produtos",//O fetch manda uma requisição para url digitada, futuramente será o link do banco de dados feitos por nós
      {
        method: "PUT",//A requisição irá ser do método post, ou seja, por baixo dos panos (Existe 5 métodos de requisição)
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(//O corpo da requisição será essa
          {
            id: id,
            titulo: nome,
            descricao: descricao,
            ano: ano,
            duracao: duracao,
            imagem: imagem,
            categoria: inputValue,
            usuario: localStorage.getItem("usuario")
          }
        )
      })
      .then((resposta) => resposta.json())//Então se tudo deu certo pega a resposta e transforma em JSON
      .then((json) => {
        if (json._id)//Se a resposta do json tiver um cpf quer dizer que o cadastro foi bem sucedido
        {
          setEditar(true)
          setErro(false)
        }
        else {//Caso contrário, não foi aceito o cadastrado, portanto dará um erro
          setErro(true);
          setEditar("Não foi possível fazer a edição deste filme")
        }
      })
      .catch((erro) => { setErro(true) })

  }

  return (
    <>
      <Header></Header>
      <Container component="section" maxWidth="xs">
        <Box sx={{
          mt: 10,
          padding: "40px",
          borderRadius: "10px",
          boxShadow: "2px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          background: "black",
          opacity: "0.85"
        }}
        >

          {erro && (<Alert severity="warning">{erro}</Alert>)}
          {editar && (<Alert severity="success">Filme editado com sucesso</Alert>)}
          <Typography component="h1" variant='h5' color="#fff">Editar Computador</Typography>
          <Box component="form" onSubmit={Editar}>
            <TextField sx={{
              backgroundColor: 'white',
              borderRadius: "5px"
            }}
              label="Processador"
              variant='filled'
              type='name'
              margin='normal'
              fullWidth
              value={nome}
              onChange={(e) => setTitulo(e.target.value)}
            />
            <TextField sx={{
              backgroundColor: 'white',
              borderRadius: "5px",
              marginTop: "8px"
            }}
              label="Armazenamento"
              variant='filled'
              type='text'
              margin='normal'
              fullWidth
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />
            <TextField sx={{
              backgroundColor: 'white',
              borderRadius: "5px",
              marginTop: "8px"
            }}
              label="Placa mãe"
              variant='filled'
              type='text'
              margin='normal'
              fullWidth
              value={ano}
              onChange={(e) => setAno(e.target.value)}
            />
            <TextField sx={{
              backgroundColor: 'white',
              borderRadius: "5px",
              marginTop: "8px"
            }}
              label="Memória ram"
              variant='filled'
              type='text'
              margin='normal'
              fullWidth
              value={duracao}
              onChange={(e) => setDuracao(e.target.value)}
            />
            <Autocomplete sx={{
              backgroundColor: 'white',
              borderRadius: "5px",
              marginTop: "8px"
            }}
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
              }}
              id="controllable-states-demo"
              options={options}
              renderInput={(params) => <TextField {...params} label="Controllable" />}
            />
            <TextField sx={{
              backgroundColor: 'white',
              borderRadius: "5px"
            }}
              label="Url da imagem do Computador"
              variant='filled'
              type='text'
              margin='normal'
              fullWidth
              value={imagem}
              onChange={(e) => setImagem(e.target.value)}
            />
            <Button type='submit' variant="contained" fullWidth sx={{ mt: 2, mb: 2, backgroundColor: "#390850" }}>Editar</Button>
          </Box>
        </Box>
      </Container>
    </>
  )
}

export default EditaFilme;