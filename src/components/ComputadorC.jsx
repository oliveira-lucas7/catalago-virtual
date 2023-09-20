import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography, Link } from "@mui/material"
import Style from "./filmes.module.css"

function Filmes(props) {
    return (
        <Card sx={{maxWidth: 550, overflow: "inherit"}}>
            <CardActionArea >
                <CardMedia sx={{
                    height: "150px",
                    width: "180px",
                    textAlign: "center",
                    margin: "10px auto",
                    borderRadius: "20px"
                }}
                    component="img"
                    image={props.imagem}
                    alt={props.titulo}
                />
                <CardContent sx={{
                    width: "20rem",
                }}>
                    <Typography variant="h5" component="div">
                        {props.titulo}
                    </Typography>
                    <Typography variant="body2">
                        {props.descricao}
                    </Typography>
                    <Grid container>
                        <Grid item xs={6}>
                            <span>{props.categoria}</span>
                        </Grid>
                        <Grid item xs={6}>
                            <span>{props.ano}</span>
                        </Grid>
                        <Grid item xs>
                            <span>{props.duracao}</span>
                        </Grid>
                    </Grid>
                </CardContent>
                <Grid item xs={6}>
                    <Link onClick={props.excluir} className={Style.excluir}>X</Link>
                </Grid>
                <Grid item xs={6}>
                    <Link href={"edicao/" + props.id} className={Style.editar}>Editar</Link>
                </Grid>
            </CardActionArea>

        </Card>
    )
}

export default Filmes;