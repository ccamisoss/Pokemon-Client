import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPokeById } from "../actions";
import { NavBar } from "./NavBar";

export function Detail(props) {
  const dispatch = useDispatch();
  const poke = useSelector((state) => state.detalle);

  useEffect(() => {
    let id = props.match.params.id;
    dispatch(getPokeById(id));
  });

  return (
    <div>
      <NavBar/>
      <h2>
        {`${poke.id}. ${poke.name?.charAt(0).toUpperCase() + poke.name?.slice(1)}`}
      </h2>
      <img src={poke.image} alt="" />
      Tipos:
      {poke.types?.map((t) => (
        <span> {t.charAt(0).toUpperCase() + t.slice(1)}. </span>
      ))}
      <ul>
        {/* <li>Id: {poke.id}</li> */}
        <li>Vida: {poke.hp}</li>
        <li>Ataque: {poke.attack}</li>
        <li>Defensa: {poke.defense}</li>
        <li>Velocidad: {poke.speed}</li>
        <li>Altura: {poke.height}</li>
        <li>Peso: {poke.weight}</li>
      </ul>
    </div>
  );
}
