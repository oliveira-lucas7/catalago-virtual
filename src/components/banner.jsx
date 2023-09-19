import React from 'react'
import Style from "./banner.module.css";
import Baner from "./ban.webp"

function Banner() {
  return (
    <section className={Style.geralbaner}>
        <div className={Style.img}>
            <img src={Baner} style={{height: 500}} />
        </div>
        <div className={Style.frase}>
            <h2><a href="">Cadastre o seu computador</a></h2>
        </div>
    </section>
  )
}

export default Banner;