import { useSelector, useDispatch } from "react-redux";
import { filterPokemonsByType, filterPokemonsByOrigin, getByName } from "../actions/index";

export function SearchBar() {
  const dispatch = useDispatch();
  const tipos = useSelector((state) => state.tipos);

  const handleFilterByType = (e) => {
    dispatch(filterPokemonsByType(e.target.value));
  };

  const handleFilterByOrigin = (e) => {
    dispatch(filterPokemonsByOrigin(e.target.value));
  };

  const handleSearchByName = (e) => {
    dispatch(getByName(e.target.value))
  }

  return (
    <div>
      <div>
        <input type="text" placeholder="Search..." value="" />
        <button onClick={e => handleSearchByName(e)}>Buscar Pokemon</button>
      </div>
      <select>
        <option value="asc">Nombre ascendente</option>
        <option value="desc">Nombre descendente</option>
      </select>
      <select>
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
