import { NavLink } from "react-router-dom";
import styles from "../styles/Pokemon.module.css";
import { capitalizeFirstLetter } from "../utils"
import defaultImg from '../images/prueba.png'

export function Pokemon({ name, image, types, id }) {
  return (
    <NavLink className={styles.nav} to={`/pokemon/${id}`}>
      <div className={styles.contenedor}>
        <h3>{capitalizeFirstLetter(name)}</h3>
        <div className={styles.imgContainer}>
          <img className={styles.pokeImg} src={image || defaultImg} alt="" />
        </div>
        <div>
          <h5>Tipos: </h5>
          {types?.map((t,i) => (
            <h5 key={i}>{capitalizeFirstLetter(t)}. </h5>
          ))}
        </div>
      </div>
    </NavLink>
  );
}
