import { NavLink } from "react-router-dom";
import styles from "../styles/NavBar.module.css"

export function NavBar(){
    return(
    <header className={styles.header}>
         <NavLink to="/create">
            <button className={styles.button}>Crear Pokemon</button>
        </NavLink>
        <NavLink to="/home">
            <button className={styles.button}>Home</button>
        </NavLink>
    </header>
  )
}