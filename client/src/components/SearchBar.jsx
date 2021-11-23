import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getTypes } from "../actions";

export function SearchBar() {
  const dispatch = useDispatch();
  const tipos = useSelector((state) => state.tipos);
  
  useEffect(() => {
    dispatch(getTypes());
  });

  return (
    <div>
      <div>
        <input type="text" placeholder="Search..." />
        <button>Buscar Pokemon</button>
      </div>
      <select name="orden alfabetico" id="">
        <option value="asc">Nombre ascendente</option>
        <option value="desc">Nombre descendente</option>
      </select>
      <select name="orden x fuerza" id="">
        <option value="asc">Fuerza ascendente</option>
        <option value="desc">Fuerza descendente</option>
      </select>
      <select name="type" id="">
        {tipos?.map((t) => {
          let nombre = t.name?.charAt(0).toUpperCase() + t.name?.slice(1);
          return <option value={t.name}>{nombre}</option>;
        })}
      </select>
      <select name="origin" id="">
        <option value="todos">Todos</option>
        <option value="db">Creados</option>
        <option value="api">Pokeapi</option>
      </select>
    </div>
  );
}
