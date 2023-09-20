import { Alert, Box, Button, Checkbox, Container, FormControl, FormControlLabel, Grid, TextField, Typography } from '@mui/material'
import React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { Navigate, json, useNavigate } from 'react-router-dom';
import { type } from '@testing-library/user-event/dist/type';
import fundo from "./photos/fundo.webp"
import Header from "./components/header"

function Cadastro() {

  document.body.style.backgroundImage = "url("+fundo+")";

  const [ email, setEmail]= useState("");
  const [ senha, setSenha]= useState("");
  const [ telefone, setTelefone] = useState("");
  const [ nome , setNome]=useState("");
  const [ cpf , setCpf]=useState("");
  const navigate = useNavigate()

  const [ cadastro, setCadastro]=useState(false);
  const [ erro, setErro]=useState(false);

  function Cadastrar(e){
    e.preventDefault();

    fetch( process.env.REACT_APP_BACKEND + "usuarios",//O fetch manda uma requisição para url digitada, futuramente será o link do banco de dados feitos por nós
    {method: "POST",//A requisição irá ser do método post, ou seja, por baixo dos panos (Existe 5 métodos de requisição)
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(//O corpo da requisição será essa
      {
        nome: nome,
        email: email,
        cpf: cpf,
        telefone: telefone,
        senha: senha,
      }
    )})
    .then((resposta) => resposta.json())//Então se tudo deu certo pega a resposta e transforma em JSON
    .then((json) => {
      if (json.cpf)//Se a resposta do json tiver um cpf quer dizer que o cadastro foi bem sucedido
      {
        setCadastro(true)
      }
      else{//Caso contrário, não foi aceito o cadastrado, portanto dará um erro
        setErro(true);
      }
    })
    .catch((erro) => { setErro(true)})
  }
    //limpando os campos após o cadastro, quando o cadastro for alterado
    useEffect( () =>
    {
      setNome("");
      setEmail("");
      setCpf("");
      setTelefone("");
      setSenha("");
      setCadastro(false);
    },[cadastro])

  return (
    <>
    <Header />
    <Container component="section" maxWidth="xs">
        <Box sx={{
          mt: 12, 
          padding: "40px", 
          borderRadius: "10px", 
          borderRadius: "10px",
          boxShadow: "2px", 
          display:"flex", 
          flexDirection:"column", 
          alignItems:"center", 
          background:"rgba(0,0,0,.75)"}}
          >
          <Typography component="h1" variant='h5' color="#fff">Cadastro</Typography>
          {erro && (<Alert severity='warning' sx={{mt:2, mb:2}}>Desculpe tente novamente</Alert>) /* Se a variável erro for true, ou seja, deu um erro, portanto será dado um alerta*/}
          {cadastro && (<Alert severity="info"><Alert>Você foi cadastro com sucesso</Alert></Alert>) /*se a variável cadastro for true, ou seja, o cadastro foi realizado com sucesso, portanto será dado um alerta*/}
          <Box component="form" onSubmit={Cadastrar} /*Quando clicar no botão para enviar o formulário irá chamar essa função*/>
            <TextField sx={{
              backgroundColor: "white",
              borderRadius: "5px"
            }}
            label="Nome Completo" 
            variant='filled' 
            type='name'
            margin='normal' 
            fullWidth
            value={nome}
            onChange={(e)=> setNome(e.target.value)}
            />
            <TextField sx={{
              backgroundColor: "white",
              borderRadius: "5px"
            }}
            label="Email" 
            variant='filled' 
            type='email' 
            margin='normal' 
            fullWidth
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
            />
            <TextField sx={{
              backgroundColor: "white",
              borderRadius: "5px"
            }}
            label="Telefone" 
            variant='filled' 
            type='number'
            margin='normal' 
            fullWidth
            value={telefone}
            onChange={(e)=>setTelefone(e.target.value)}  
            />
            <TextField sx={{
              backgroundColor: "white",
              borderRadius: "5px"
            }}
            label="CPF" 
            variant='filled' 
            type='text'
            margin='normal' 
            fullWidth
            value={cpf}
            onChange={(e)=>setCpf(e.target.value)}  
            />
            <TextField sx={{
              backgroundColor: "white",
              borderRadius: "5px"
            }}
            label="Senha" 
            variant='filled' 
            type='password'
            margin='normal' 
            fullWidth
            value={senha}
            onChange={(e)=> setSenha(e.target.value)}  
            />
            <Button type='submit' variant="contained" fullWidth sx={{mt:2, mb:2, backgroundColor: "#390850"}}>Cadastrar</Button>
          </Box>
        </Box>
      </Container>
      </>
  )
}

export default Cadastro