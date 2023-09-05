import { Box, Button, Checkbox, Container, FormControlLabel, Grid, TextField, Typography } from '@mui/material'
import React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
          main: '#D62413',
        },
        secondary: {
          main: '#346187',
          light: '#7f1365',
        },
        background: {
          default: '#161616',
          paper: '#0cd66f',
        },
        error: {
          main: '#d32f2f',
        },
        success: {
          main: '#2e7d32',
        },
      },
});

function Login() {

    const[ email, setEmail ] = useState( "" );
    const[ senha, setSenha ] = useState( "" );
    const[ lembrar, setLembrar ] = useState( false );
    const[ login, setLogin ] = useState( false ); 
    const[ erro, setErro ] = useState( false );
    const navigate = useNavigate();

    useEffect( () => {

        if( login ) {
            localStorage.setItem( "usuario" , JSON.stringify( { email: email } ) );
            setEmail( " " );
            setSenha( " " );
            navigate( "/" );
        }

    }, [login]);

    function Autenticar( evento )
    {

        evento.preventDefault();
    //Quando o botão de login for clicado, ele será acionado no Box component (Isso serve para que não recarregue a página quando o botão for acionado)

        fetch( "https://api.escuelajs.co/api/v1/auth/login",{
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(
            {
                email: email, //No banco de dados terá campos de emails, aonde neles será procurado o email solicitado pelo o usuário
                password: senha //No banco de dados terá campos de senhas, aonde neles será procurado a senha solicitada pelo o usuário
            }
        )
        })
        .then( (resposta) => resposta.json() ) //Se tudo ocorrer da maneira correta, a resposta se tem o email e senha no banco de dados, será entregue/feita na forma de Json
        .then( ( json ) => {
            if( json.statusCode === 401 ){
                setErro( true );
//401 é o código enviado através do json para dizer que ou a senha ou o email estão errado, e se caso o status do pedido do login for igual a 401, dá erro, se for diferente, deu certo 
            } else {
                setLogin( true );
            }
        })
        .catch( ( erro ) => { setErro(true)})
    }

  return (
    <ThemeProvider theme={theme}>
    <Container component="section" maxWidth="xs">
        <Box 
        sx={{
            mt: 10,
            backgroundColor: "#C4C4C4",
            padding: "50px",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            alignItems: 'center',
            }}>

            <Typography component="h1" variant='h4'>Entrar</Typography>
            <Box component="form" onSubmit={Autenticar} >
                <TextField 
                type="email" 
                label="Email" 
                variant="outlined" 
                margin="normal" 
                value={email}
                onChange={ (e) => setEmail( e.target.value )}
                //No início, não há nada no email, e quando o usuário começar a digitar, automaticamente vai ser mudado o email
                fullWidth
                />
                <TextField 
                type="password" 
                label="Senha" 
                variant="outlined" 
                margin="normal" 
                value={senha}
                onChange={ (e) => setSenha( e.target.value )}
                //No início, não há nada na senha, e quando o usuário começar a digitar, automaticamente vai ser mudado a senha
                fullWidth
                />
                <FormControlLabel
                    control={<Checkbox value={lembrar} name='lembrar' onChange={(e) => setLembrar( !lembrar )}/>}
                    //A exclamação no lembrar tem a função de inverter o valor do elemento, se clicar é true, se não, é false
                    label="Lembrar-Me"
                />
                <Button type="submit" variant="contained" fullWidth sx={{ mt: 2, mb: 2 }}>Login</Button>
                <Grid container>
                    <Grid item xs>
                        Esqueci a senha
                    </Grid>
                    <Grid item>
                        Cadastrar
                    </Grid>
                </Grid>
            </Box>
        </Box>
    </Container>
    </ThemeProvider>
  )
}

export default Login