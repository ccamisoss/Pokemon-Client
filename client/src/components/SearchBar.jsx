/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  filterPokemonsByType,
  filterPokemonsByOrigin,
  getByName,
  orderByName,
  orderByAttack,
} from "../actions/index";
import styles from "../styles/SearchBar.module.css"

export function SearchBar() {
  const [pokeName, setPokeName] = useState("")
  const dispatch = useDispatch();
  const tipos = useSelector((state) => state.tipos);

  const handleFilterByType = (e) => {
    dispatch(filterPokemonsByType(e.target.value));
  };

  const handleFilterByOrigin = (e) => {
    dispatch(filterPokemonsByOrigin(e.target.value));
  };

  const handleSortByName = (e) => {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
  };

 const handleSortByAttack = (e) => {
    e.preventDefault();
    dispatch(orderByAttack(e.target.value));
  };

  const handleChange = (e) => {
    setPokeName(e.target.value)
  }

  const handleSearchByName = (e) => {
    e.preventDefault();
    dispatch(getByName(pokeName));
    setPokeName("")
  }; 
  return (
    <div className={styles.div}>
      <div>
        <form onSubmit={(e) => handleSearchByName(e)}>
          <input type="text" placeholder="Search..." value={pokeName} onChange={handleChange} />
          <button>Buscar Pokemon</button>
        </form>
      </div>
      <select onChange={(e) => handleSortByName(e)}>
        <option value="asc">Nombre ascendente</option>
        <option value="desc">Nombre descendente</option>
      </select>
      <select onChange={(e) => handleSortByAttack(e)}>
        <option value="asc">Fuerza ascendente</option>
        <option value="desc">Fuerza descendente</option>
      </select>
      <select onChange={(e) => handleFilterByType(e)}>
        {tipos?.map((t) => {
          let nombre = t.name?.charAt(0).toUpperCase() + t.name?.slice(1);
          return (
            <option value={t.name} key={t.id}>
              {nombre}
            </option>
          );
        })}
      </select>
      <select onChange={(e) => handleFilterByOrigin(e)}>
        <option value="db">Creados</option>
        <option value="api">Pokeapi</option>
      </select>
      <button onClick={() => dispatch(filterPokemonsByType("all"))}>
        Resetear búsqueda
      </button>
    </div>
  );
}
