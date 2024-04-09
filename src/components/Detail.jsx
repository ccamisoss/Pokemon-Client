import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPokeById } from "../actions";
import { NavBar } from "./NavBar";
import styles from "../styles/Detail.module.css";
import { useParams } from "react-router-dom";
import { capitalizeFirstLetter } from "../utils";
import defaultImg from '../images/prueba.png'

export function Detail(props) {
  const dispatch = useDispatch();
  const poke = useSelector((state) => state.detalle);
  let { id } = useParams();

  useEffect(() => {
    dispatch(getPokeById(id));
  }, [dispatch, id]);

  if (JSON.stringify(poke) === "{}") {
    return (
      <>
        <NavBar />
        <div className={styles.notFound}>
          <h4>No se encontró el pokemon</h4>
        </div>
      </>
    );
  } else {
    return (
      <div className={styles.contenedor}>
        <NavBar />
        <div className={styles.pokeContenedor}>
          <h2 className={styles.h2}>{capitalizeFirstLetter(poke.name)}</h2>
          <img className={styles.img} src={poke.img || defaultImg} alt="" />
          <div className={styles.infoContainer}>
            <ul className={styles.ul}>
              <li>Id: {poke.id}</li>
              <li>Vida: {poke.vida}</li>
              <li>Ataque: {poke.fuerza}</li>
              <li>Defensa: {poke.defensa}</li>
              <li>Velocidad: {poke.velocidad}</li>
              <li>Altura: {poke.height}</li>
              <li>Peso: {poke.weight}</li>
            </ul>
            <div className={styles.types}>
              <span className={styles.span}>Tipo: </span>
              {poke.type?.map((t, x) => (
                <span key={x} className={styles.span}>
                  {" "}
                  {capitalizeFirstLetter(t)}.{" "}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
