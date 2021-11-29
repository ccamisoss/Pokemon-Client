import {
  GET_POKEMONS,
  GET_BY_ID,
  GET_TYPES,
  GET_BY_NAME,
  FILTER_BY_TYPE,
  FILTER_BY_ORIGIN,
  ORDER_BY_NAME,
  ORDER_BY_ATTACK
} from "../actions";

const initialState = {
  pokemons: [],
  allPokemons: [],
  detalle: {},
  tipos: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POKEMONS:
      return {
        ...state,
        pokemons: action.payload,
        allPokemons: action.payload,
      };
    case GET_BY_NAME:
      return {
        ...state,
        pokemons: [action.payload],
      };
    case GET_BY_ID:
      return {
        ...state,
        detalle: action.payload,
      };
    case FILTER_BY_TYPE:
      let filteredPokes =
        action.payload === "all"
          ? state.allPokemons
          : state.allPokemons.filter((p) =>
              p.types.includes(
                action.payload.charAt(0).toUpperCase() + action.payload.slice(1)
              )
            );
      return {
        ...state,
        pokemons: filteredPokes,
      };
    case FILTER_BY_ORIGIN:
      let pokesByOrigin =
        action.payload === "db"
          ? state.allPokemons.filter((p) => p.createdInDB)
          : state.allPokemons.filter((p) => !p.createdInDB);
      return {
        ...state,
        pokemons: pokesByOrigin,
      };
    case GET_TYPES:
      return {
        ...state,
        tipos: action.payload,
      };
    case ORDER_BY_NAME:
      let sortedArr= action.payload === "asc"? 
      state.pokemons.sort((a,b) => {
        if(a.name > b.name) return 1;
        if(b.name > a.name) return -1;
        return 0;
      }) :
      state.pokemons.sort((a,b) => {
        if(a.name > b.name) return -1;
        if(b.name > a.name) return 1;
        return 0;
      });
      return{
        ...state,
        pokemons: sortedArr
      }
      case ORDER_BY_ATTACK:
      let sortedArr2= action.payload === "asc"? 
      state.pokemons.sort((a,b) => {
        if(a.attack > b.attack) return 1;
        if(b.attack > a.attack) return -1;
        return 0;
      }) :
      state.pokemons.sort((a,b) => {
        if(a.attack > b.attack) return -1;
        if(b.attack > a.attack) return 1;
        return 0;
      });
      return{
        ...state,
        pokemons: sortedArr2
      }
    default:
      return state;
  }
}
