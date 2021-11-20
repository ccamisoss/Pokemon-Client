/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { getAllPokemons } from "../actions";
import { useSelector, useDispatch } from "react-redux";
import { Pokemon } from "./Pokemon";

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
      <button onClick={(e) => handleClick(e)}>prueba</button>
      {pokemons.map((p) => (
        <Pokemon name={p.name} image={p.image} types={p.types} />
      ))}
    </div>
  );
}
