import { GET_POKEMONS, GET_BY_ID } from "../actions";

const initialState={
    pokemons:[],
    detalle:{},
    tipos:[]
}

export default function rootReducer(state = initialState, action){
    switch(action.type){
        case GET_POKEMONS:
            return{
                ...state,
                pokemons: action.payload
            }
        case GET_BY_ID:
            return{
                ...state,
                detalle: action.payload
            }
        default:
            return state;
    }
}