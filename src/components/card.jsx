import React from 'react'
import Setup from "./setup.jpg"
import Style from "./card.module.css"

function Card() {
  return (
    <>
    <div className={Style.venda}>
        <h2>Computadores a venda</h2>
    </div>
        <section className={Style.produtos}>
            <div className={Style.cartao}>
                <div className={Style.imgcard}>
                    <img src={Setup} className={Style.setup}/>
                </div>
                <div className={Style.info}>
                    <h2>Computador gamer</h2>
                    <h3>R$ 5000</h3>
                </div>
                <div className={Style.but}>
                    <button>Comprar</button>
                </div>
            </div>
            <div className={Style.cartao}>
                <div className={Style.imgcard}>
                    <img src={Setup} />
                </div>
                <div>
                    <span>Computador gamer</span>
                    <h2>R$ 5000</h2>
                </div>
                <div className={Style.but}>
                    <button>Comprar</button>
                </div>
            </div>
            <div className={Style.cartao}>
                <div className={Style.imgcard}>
                    <img src={Setup} />
                </div>
                <div>
                    <span>Computador gamer</span>
                    <h2>R$ 5000</h2>
                </div>
                <div className={Style.but}>
                    <button>Comprar</button>
                </div>
            </div>
            <div className={Style.cartao}>
                <div className={Style.imgcard}>
                    <img src={Setup} />
                </div>
                <div>
                    <span>Computador gamer</span>
                    <h2>R$ 5000</h2>
                </div>
                <div className={Style.but}>
                    <button>Comprar</button>
                </div>
            </div>
        </section>
    </>
  )
}

export default Card