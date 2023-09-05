import { Avatar, Button } from "@mui/material";

function App() {
  return (
    <>
      <h1>Home</h1>
      <Button variant="contained">Contained</Button>
      <Button variant="outlined" color="warning">Vazio</Button>
      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
    </>
  );
}

export default App;
//quando precisar importar um componente já feito, primeiro escreve ele como componente para importar automaticamente e depois copia e cola o componente do site