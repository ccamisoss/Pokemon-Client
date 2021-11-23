/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { getAllPokemons } from "../actions";
import { useSelector, useDispatch } from "react-redux";
import { Pokemon } from "./Pokemon";
import { SearchBar } from "./SearchBar";
import { NavBar } from "./NavBar"

export function Home() {
  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.pokemons);  

  useEffect(() => {
    dispatch(getAllPokemons());
  });

  function handleClick(e) {
    e.preventDefault();
    dispatch(getAllPokemons());
  }

  return (
    <div>
     <NavBar/>
      <img src="" alt="" />
      <SearchBar/>
      <button onClick={(e) => handleClick(e)}>Recargar Pokemons</button>
      {pokemons.map((p) => (
        <Pokemon name={p.name} image={p.image} types={p.types} id={p.id} />
      ))}
    </div>
  );
}
