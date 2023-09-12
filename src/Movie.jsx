import { Alert, Autocomplete, Box, Button, Container, TextField, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react'


function Movie() {

  const options = ["Terror", "Drama", "Comédia", "Documentário", "Ação", "Suspense"]
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [ano, setAno] = useState("");
  const [duracao, setDuracao] = useState("")
  const [imagem, setImagem] = useState("");
  const [erro, setErro] = useState(false)

  const [value, setValue] = React.useState(options[0]);
  const [inputValue, setInputValue] = React.useState('');

  const [cadastro, setCadastro] = useState(false)


  function Cadastrar(e) {
    e.preventDefault();

    fetch( process.env.REACT_APP_BACKEND + "filmes",//O fetch manda uma requisição para url digitada, futuramente será o link do banco de dados feitos por nós
      {
        method: "POST",//A requisição irá ser do método post, ou seja, por baixo dos panos (Existe 5 métodos de requisição)
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(//O corpo da requisição será essa
          {
            titulo: nome,
            descricao: descricao,
            ano: ano,
            duracao: duracao,
            imagem: imagem,
            categoria: inputValue,
          }
        )
      })
      .then((resposta) => resposta.json())//Então se tudo deu certo pega a resposta e transforma em JSON
      .then((json) => {
        if (json._id)//Se a resposta do json tiver um cpf quer dizer que o cadastro foi bem sucedido
        {
          setCadastro(true);
          setErro(false);
        }
        else {//Caso contrário, não foi aceito o cadastrado, portanto dará um erro
          setErro(true);
          setCadastro(false);
        }
      })
      .catch((erro) => { setErro(true) })
  }
  //limpando os campos após o cadastro, quando o cadastro for alterado
  useEffect(() => {
    setNome("");
    setDescricao("");
    setAno("");
    setDuracao("");
    setImagem("");
    setCadastro(false);
  }, [cadastro])

  return (
    <Container component="section" maxWidth="xs">
      <Box sx={{
        mt: 10,
        padding: "40px",
        borderRadius: "10px",
        boxShadow: "2px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      >
        { erro && (<Alert severity='warning'>Filme já castrado. tente novamente por favor</Alert>)}
        { cadastro && ( <Alert severity='success'>Obrigado por cadastrar seu filme</Alert>)}
        <Typography component="h1" variant='h5' color="#161616">Cadastrar um filme</Typography>
        <Box component="form" onSubmit={Cadastrar} /*Quando clicar no botão para enviar o formulário irá chamar essa função*/>
          <TextField
            label="Título"
            variant='filled'
            type='name'
            margin='normal'
            fullWidth
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <TextField
            label="Descrição"
            variant='filled'
            type='text'
            margin='normal'
            fullWidth
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
          <TextField
            label="Ano"
            variant='filled'
            type='number'
            margin='normal'
            fullWidth
            value={ano}
            onChange={(e) => setAno(e.target.value)}
          />
          <TextField
            label="Duração"
            variant='filled'
            type='time'
            margin='normal'
            fullWidth
            value={duracao}
            onChange={(e) => setDuracao(e.target.value)}
          />
          <Autocomplete
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
          <TextField
            label="Url da Imagem"
            variant='filled'
            type='text'
            margin='normal'
            fullWidth
            value={imagem}
            onChange={(e) => setImagem(e.target.value)}
          />
          <Button type='submit' variant="contained" fullWidth sx={{ mt: 2, mb: 2 }}>Confirmar</Button>
        </Box>
      </Box>
    </Container>
  )
}

export default Movie