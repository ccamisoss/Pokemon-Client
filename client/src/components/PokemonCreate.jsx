import { NavBar } from "./NavBar";
import styles from "../styles/PokemonCreate.module.css";
import { useEffect, useState } from "react";
import { createPoke } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import { getTypes } from "../actions/index";

export function PokemonCreate() {
  let initialState = {
    name: "",
    height: "",
    weight: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    type: [],
  };

  const dispatch = useDispatch();
  const types = useSelector((state) => state.tipos);
  const [p, setPokemon] = useState(initialState);
  const [error, setError] = useState({
    nameError: "",
    statError: "",
  });

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  const handleChange = (e) => {
    setPokemon({
      ...p,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    let nameError = "";
    let statError = "";

    if (/[a-zA-Z]/g.test(p.name) === false) {
      nameError = "El nombre debe contener letras";
    }
    if (nameError) {
      setError({
        ...error,
        nameError: nameError,
      });
      return false;
    }

    if (
      typeof parseInt(p.height) !== "number" ||
      typeof parseInt(p.attack) !== "number" ||
      typeof parseInt(p.defense) !== "number" ||
      typeof parseInt(p.hp) !== "number" ||
      typeof parseInt(p.speed) !== "number" ||
      typeof parseInt(p.weight) !== "number"
    ) {
      statError = "Todas las estadisticas deben ser numeros del 0 al 1000";
    } else if (
      p.height > 1000 ||
      p.attack > 1000 ||
      p.defense > 1000 ||
      p.hp > 1000 ||
      p.speed > 1000 ||
      p.weight > 1000
    ) {
      statError = "Todas las estadisticas deben ser numeros del 0 al 1000";
    } else if (
      p.height < 0 ||
      p.attack < 0 ||
      p.defense < 0 ||
      p.hp < 0 ||
      p.speed < 0 ||
      p.weight < 0
    ) {
      statError = "Todas las estadisticas deben ser numeros del 0 al 1000";
    }

    if (statError) {
      setError({
        ...error,
        statError: statError,
      });
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (isValid) {
      dispatch(
        createPoke({
          pokemon: {
            name: p.name,
            height: parseInt(p.height),
            weight: parseInt(p.weight),
            hp: parseInt(p.hp),
            attack: parseInt(p.attack),
            defense: parseInt(p.defense),
            speed: parseInt(p.speed),
          },
          tipos: p.type,
        })
      );
      setError({
        nameError: "",
        statError: "",
      });
      setPokemon(initialState);
      alert("El pokemon ha sido creado con exito!");
    }
  };

  const handleSelect = (e) => {
    if (!p.type.includes(e.target.value)) {
      setPokemon({
        ...p,
        type: [...p.type, e.target.value],
      });
    } else {
      setPokemon({
        ...p,
        type: p.type.filter((t) => t !== e.target.value),
      });
    }
  };

  return (
    <div className={styles.fragment}>
      <NavBar />
      <form onSubmit={handleSubmit} className={styles.contenedor}>
        <label>Nombre del Pokemon:</label>
        <input
          className={styles.input}
          required={true}
          name="name"
          value={p.name}
          onChange={handleChange}
        />
        <h1 className={styles.h1}>{error.nameError}</h1>
        <label>Altura:</label>
        <input
          className={styles.input}
          required={true}
          name="height"
          value={p.height}
          onChange={handleChange}
        />
        <label>Peso:</label>
        <input
          className={styles.input}
          required={true}
          name="weight"
          value={p.weight}
          onChange={handleChange}
        />
        <label>Vida:</label>
        <input
          className={styles.input}
          required={true}
          name="hp"
          value={p.hp}
          onChange={handleChange}
        />
        <label>Ataque:</label>
        <input
          className={styles.input}
          required={true}
          name="attack"
          value={p.attack}
          onChange={handleChange}
        />
        <label>Defensa:</label>
        <input
          className={styles.input}
          required={true}
          name="defense"
          value={p.defense}
          onChange={handleChange}
        />
        <label>Velocidad:</label>
        <input
          className={styles.input}
          required={true}
          name="speed"
          value={p.speed}
          onChange={handleChange}
        />
        <h1 className={styles.h1}>{error.statError}</h1>
        <label className={styles.label}>Tipo de Pokemon:</label>
        <div className={styles.select}>
          {types?.map((t, i) => (
            <label key={i}>
              <input
                className={styles.types}
                type="checkbox"
                value={t.name}
                onClick={handleSelect}
              />
              {t.name.charAt(0).toUpperCase() + t.name?.slice(1)}
            </label>
          ))}
        </div>
        <button>Crear Pokemon</button>
      </form>
    </div>
  );
}
