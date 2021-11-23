import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/LandingPage.module.css"
import gang from "../styles/images/gang.png"
import logo from "../styles/images/pokelandign.png"

export function LandingPage(){
    return(
        <div className={styles.contenedor}>
            <img src={logo} className={styles.pic} alt="" />
            <Link to="/home">
            <button>Comenzar</button>
            </Link>
            <img src={gang} className={styles.pic} alt="" />
        </div>
    )
}