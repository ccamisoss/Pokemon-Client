import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPokeById } from "../actions";
import { NavBar } from "./NavBar";
import styles from "../styles/Detail.module.css";

export function Detail(props) {
  const dispatch = useDispatch();
  const poke = useSelector((state) => state.detalle);

  useEffect(() => {
    let id = props.match.params.id;
    dispatch(getPokeById(id));
  },[dispatch, props.match.params.id]);

  if (!poke) {
    return (
      <>
        <NavBar />
        <div className={styles.notFound}>
          <h4>No se encontraron pokemones</h4>
        </div>
      </>
    );
  } else {
    return (
      <div className={styles.contenedor}>
        <NavBar />
        <div className={styles.pokeContenedor}>
          <h2 className={styles.h2}>{poke.name}</h2>
          <img className={styles.img} src={poke.image} alt="" />
          <div className={styles.infoContainer}>
            <ul className={styles.ul}>
              <li>Id: {poke.id}</li>
              <li>Vida: {poke.hp}</li>
              <li>Ataque: {poke.attack}</li>
              <li>Defensa: {poke.defense}</li>
              <li>Velocidad: {poke.speed}</li>
              <li>Altura: {poke.height}</li>
              <li>Peso: {poke.weight}</li>
            </ul>
            <div className={styles.types}>
              <span className={styles.span}>Tipo: </span>
              {poke.types?.map((t) => (
                <span className={styles.span}> {t}. </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
