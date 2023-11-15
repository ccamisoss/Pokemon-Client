import { NavLink } from "react-router-dom";
import styles from "../styles/Pokemon.module.css";

export function Pokemon({ name, image, types, id }) {
  return (
    <NavLink className={styles.nav} to={`/pokemon/${id}`}>
      <div className={styles.contenedor}>
        <h3>{name}</h3>
        <img className={styles.pokeImg} src={image} alt="" />
        <div>
          <h5>Tipos: </h5>
          {types?.map((t,i) => (
            <h5 key={i}>{t}. </h5>
          ))}
        </div>
      </div>
    </NavLink>
  );
}
