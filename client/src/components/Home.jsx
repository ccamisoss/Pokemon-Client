/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { getAllPokemons } from "../actions";
import { useSelector, useDispatch } from "react-redux";
import { Pokemon } from "./Pokemon";
import { SearchBar } from "./SearchBar";
import { NavBar } from "./NavBar";
import "../styles/Home.modules.css";

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
      <NavBar />
      <img src="https://64.media.tumblr.com/64d85789e75bcc90a48e90fd2645a99d/59aed066c4bf4be6-ba/s500x750/82199e7f865a3e1f494bb3d8d12a86ccfef47e2f.png" alt="" />
      <SearchBar />
      {/* <button onClick={(e) => handleClick(e)}>Recargar Pokemons</button> */}
      {pokemons.map((p) => (
        <Pokemon name={p.name} image={p.image} types={p.types} id={p.id} />
      ))}
    </div>
  );
}
