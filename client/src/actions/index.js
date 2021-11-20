import axios from 'axios'
export const GET_POKEMONS = "GET_POKEMONS";
export const GET_TYPES = "GET_TYPES";
export const GET_BY_ID = "GET_BY_ID";
export const GET_BY_NAME = "GET_BY_NAME";
export const CREATE_POKEMON = "CREATE_POKEMON";


export function getAllPokemons(){
    return async function(dispatch){
        let data = await axios.get('http://localhost:3001/pokemons')
        return dispatch({
            type: "GET_POKEMONS",
            payload: data.data
        })
    }
    // return function(dispatch){
    //     return axios.get('http://localhost:3001/pokemons')
    //     .then(json => dispatch({type: GET_POKEMONS, payload: json.data}))
    // }
}