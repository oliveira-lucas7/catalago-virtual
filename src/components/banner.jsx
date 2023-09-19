import React from 'react'
import Style from "./banner.module.css";
import Baner from "./computador.png"

function Banner() {
  return (
    <section className={Style.geralbaner}>
      <div className={Style.textimg}>
        <div className={Style.img}>
            <img src={Baner}/>
        </div>
        <div className={Style.frase}>
            <h2><a href="">O futuro chegou, garanta já o seu computador</a></h2>
        </div>
      </div>
    </section>
  )
}

export default Banner;