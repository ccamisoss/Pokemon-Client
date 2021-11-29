/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { getAllPokemons, getTypes } from "../actions";
import { useSelector, useDispatch } from "react-redux";
import { Pokemon } from "./Pokemon";
import { SearchBar } from "./SearchBar";
import { NavBar } from "./NavBar";
import styles from "../styles/Home.module.css";
import Paginado from "./Paginado";

export function Home() {
  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.pokemons);

  useEffect(() => {
    dispatch(getAllPokemons());
    dispatch(getTypes());
  },[dispatch]);

  // Paginado:
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage, setPokemonsPerPage] = useState(12);
  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons = pokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);
  const paginado = (pageNumber) => setCurrentPage(pageNumber);
 
  return (
    <div className={styles.contenedor}>
      <NavBar />
      <img
        className={styles.logo}
        src="https://64.media.tumblr.com/64d85789e75bcc90a48e90fd2645a99d/59aed066c4bf4be6-ba/s500x750/82199e7f865a3e1f494bb3d8d12a86ccfef47e2f.png"
        alt=""
      />
      <SearchBar/>
      <Paginado
        pokemonsPerPage={pokemonsPerPage}
        pokemons={pokemons.length}
        paginado={paginado}
      />
      <div className={styles.pokeContainer}>
        {currentPokemons?.map((p) => (
          <Pokemon name={p.name} image={p.image} types={p.types} id={p.id} key={p.id}/>
        ))}
      </div>
    </div>
  );
}
