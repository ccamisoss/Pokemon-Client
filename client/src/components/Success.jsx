import React from 'react'
import { NavBar } from "./NavBar"
import styles from "../styles/Success.module.css"

export const Success = () => {
    return (
        <>
            <NavBar/>
            <div className={styles.div}>
            <h4>El Pokemon ha sido creado con éxito!</h4>      
            </div>
        </>
    )
}