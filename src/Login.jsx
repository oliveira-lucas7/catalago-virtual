import { Alert, Box, Button, Checkbox, Container, FormControl, FormControlLabel, Grid, TextField, Typography } from '@mui/material'
import React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { Navigate, json, useNavigate } from 'react-router-dom';
import { blue } from '@mui/material/colors';
import Style from "./Login.module.css";
import fundo from "./photos/fundo.webp"
import Header from "./components/header"

function Login() {

  document.body.style.backgroundImage = "url("+fundo+")";

  const [ email, setEmail]= useState("");
  const [ senha, setSenha]= useState("");
  const [ lembrar , setLembrar]= useState(false);
  const [ login, setLogin]= useState(false)
  const [ erro, setErro]= useState(false)
  const navigate = useNavigate()
  useEffect( () => {
    if (login){
      localStorage.setItem("usuario", JSON.stringify({email:email}));
      setEmail("");
      setSenha("");
      navigate("/");//Está mudando a url da react, após o login manda o usuário para a página raiz (app)
    }
  }, [login])

  //função para quando enviar o formulário não recarregar a página e autenticar os dados
  function Autenticar(evento){
    evento.preventDefault();

    fetch( process.env.REACT_APP_BACKEND + "login",//O fetch manda uma requisição para url digitada, futuramente será o link do banco de dados feitos por nós
    {method: "POST",//A requisição irá ser do método post, ou seja, por baixo dos panos (Existe 5 métodos de requisição)
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(//O corpo da requisição será essa
      {
        email: email,//No banco de dados estará campos chamados email que neles será procurado o que está dentro da variável email
        password: senha//No banco de dados estará campos chamados password que neles será procurado o que está dentro da variável senha
      }
    )})
    .then((resposta) => resposta.json())//Então se tudo deu certo pega a resposta e transforma em JSON
    .then((json) => {
      if (json.statusCode === 401){//Se o número que o banco de dados retornar, ou seja, o statusCode for igual a 401, quer dizer que não foi encontrado esses dados no banco de dados, 401 é o número específico que diz que não está autorizado        setLogin(false);
        setLogin(true);//Caso contrário, quer dizer que o login foi autorizado, logo o setLogin será true
      } else {
        setErro(true)//Se satisfazer a condição quer dizer que não foi autorizado, ou seja, o setErro será true, e dará erro ao fazer o login
      }
    })
    .catch((erro) => { setErro(true)})//Qualquer tipo de erro irá cair no cath
  }

  return (
    <>
      <Header></Header>
      <Container component="section" maxWidth="xs" id="login">
        <Box sx={{
          mt: 20,
          padding: "40px", 
          borderRadius: "10px", 
          boxShadow: "2px", 
          display:"flex", 
          flexDirection:"column", 
          alignItems:"center",
          backgroundColor:"black",
          opacity: "0.82",
          }}>
          <Typography component="h1" variant='h5' color={'white'}>Entrar</Typography>
          {erro && (<Alert severity='warning'>Revise seus dados e tente novamente</Alert>) }
          <Box component="form" onSubmit={Autenticar} color={'white'} className={Style.btn}>
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
            onChange={(e) => setEmail(e.target.value)}
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
            onChange={(e) => setSenha(e.target.value)}
            />
            <FormControlLabel
            control={<Checkbox  sx={{
              backgroundColor: "white",
              height: "1px",
              width: "1px",
            }} value={lembrar} onChange={(e) => setLembrar(!lembrar)} />}// a ! serve para colocar o contrário do que está dentro da variável lembrar, pode estar true vai para false, se estiver false vai para true.
            label="Lembra-me"
            />
            <Button type='submit' variant="contained" fullWidth sx={{mt:2, mb:2, backgroundColor: "#390850"}}>Login</Button>
            <Grid container >
              <Grid item xs>
                Esqueci a senha
              </Grid>
              <a href="http://localhost:3000/cadastro">Cadastrar</a>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  )
}

export default Login;