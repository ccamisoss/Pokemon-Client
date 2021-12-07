import { NavBar } from "./NavBar";
import styles from "../styles/PokemonCreate.module.css";
import { useEffect, useState } from "react";
import { createPoke } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import { getTypes } from "../actions/index"
import { Link } from "react-router-dom";

export function PokemonCreate() {
  const dispatch = useDispatch();
  const types = useSelector((state) => state.tipos);
  const [p, setPokemon] = useState({
    name: "",
    height: "",
    weight: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    type: []
  });

  useEffect(() => {
    dispatch(getTypes())
  }, [dispatch])

  const handleChange = (e) => {
    setPokemon({
      ...p,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
    window.location.reload()
    alert("El pokemon ha sido creado con exito!");
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
        <input name="name" value={p.name} onChange={handleChange} />
        <label>Altura:</label>
        <input name="height" value={p.height} onChange={handleChange} />
        <label>Peso:</label>
        <input name="weight" value={p.weight} onChange={handleChange} />
        <label>Vida:</label>
        <input name="hp" value={p.hp} onChange={handleChange} />
        <label>Ataque:</label>
        <input name="attack" value={p.attack} onChange={handleChange} />
        <label>Defensa:</label>
        <input name="defense" value={p.defense} onChange={handleChange} />
        <label>Velocidad:</label>
        <input name="speed" value={p.speed} onChange={handleChange} />
        <label>Tipo de Pokemon:</label>
        <div className={styles.select}>
          {types?.map((t) => (
            <label>
              <input type="checkbox" value={t.name} onClick={handleSelect} />
              {t.name.charAt(0).toUpperCase() + t.name?.slice(1)}
            </label>
          ))}
        </div>
        <Link to="/create/success">
          <button >Crear Pokemon</button> 
        </Link>
      </form>
    </div>
  );
}
