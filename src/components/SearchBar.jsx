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
import styles from "../styles/SearchBar.module.css";

export function SearchBar() {
  const [pokeName, setPokeName] = useState("");
  const dispatch = useDispatch();
  const tipos = useSelector((state) => state.tipos);
  const selects = document.querySelectorAll("select");

  const handleFilterByType = (e) => {
    dispatch(filterPokemonsByType(e.target.value));
  };

  const handleFilterByOrigin = (e) => {
    dispatch(filterPokemonsByOrigin(e.target.value));
  };

  const handleSortByName = (e) => {
    e.preventDefault();
    if (e.target.value === "-") return;
    dispatch(orderByName(e.target.value));
  };

  const handleSortByAttack = (e) => {
    e.preventDefault();
    if (e.target.value === "-") return;
    dispatch(orderByAttack(e.target.value));
  };

  const handleChange = (e) => {
    setPokeName(e.target.value);
  };

  const handleSearchByName = (e) => {
    e.preventDefault();
    dispatch(getByName(pokeName.toLowerCase()));
    setPokeName("");
  };

  const onReset = () => {
    // Reset selects
    selects.forEach((select) => {
      if (select.value !== "-") select.value = "-";
    });

    dispatch(filterPokemonsByType("all"));
  };

  return (
    <div className={styles.div}>
      <div>
        <form onSubmit={(e) => handleSearchByName(e)}>
          <input
            type="text"
            placeholder="Search..."
            value={pokeName}
            onChange={handleChange}
            required={true}
          />
          <button>Buscar Pokemon</button>
        </form>
      </div>
      <select
        className={styles.option}
        defaultValue={"-"}
        onChange={(e) => handleSortByName(e)}
        id="sortByNameSelect"
      >
        <option value="-" disabled>
          Ordenar por nombre
        </option>
        <option value="asc">Ascendente</option>
        <option value="desc">Descendente</option>
      </select>
      <select
        className={styles.option}
        defaultValue={"-"}
        onChange={(e) => handleSortByAttack(e)}
      >
        <option value="-" disabled>
          Ordenar por fuerza
        </option>
        <option value="asc">Ascendente</option>
        <option value="desc">Descendente</option>
      </select>
      <select
        className={styles.option}
        defaultValue={"-"}
        onChange={(e) => handleFilterByType(e)}
        id="filterByTypeSelect"
      >
        <option value="-" disabled>
          Tipo
        </option>
        {tipos?.map((t, index) => {
          let nombre = t.name?.charAt(0).toUpperCase() + t.name?.slice(1);
          return (
            <option value={t.name} key={index}>
              {nombre}
            </option>
          );
        })}
      </select>
      <select
        className={styles.option}
        defaultValue={"-"}
        onChange={(e) => handleFilterByOrigin(e)}
        id="filterByOriginSelect"
      >
        <option value="-" disabled>
          Origen
        </option>
        <option value="db">Creados</option>
        <option value="api">Pokeapi</option>
      </select>
      <button className={styles.option} onClick={onReset}>
        Resetear búsqueda
      </button>
    </div>
  );
}
