import axios from "axios";
export const GET_POKEMONS = "GET_POKEMONS";
export const GET_TYPES = "GET_TYPES";
export const GET_BY_ID = "GET_BY_ID";
export const GET_BY_NAME = "GET_BY_NAME";
export const CREATE_POKEMON = "CREATE_POKEMON";

export function getAllPokemons() {
  return async function (dispatch) {
    let data = await axios.get("http://localhost:3001/pokemons");
    return dispatch({
      type: "GET_POKEMONS",
      payload: data.data,
    });
  };
}

export function getByName(name){
  return async function (dispatch) {
    let data = await axios.get("http://localhost:3001/pokemons?name="+ name);
    return dispatch({
      type: "GET_BY_NAME",
      payload: data.data,
    });
  };
}

export function getPokeById(id) {
  return async function(dispatch){
    let data = await axios.get('http://localhost:3001/pokemons/'+ id);
    return dispatch({
      type: "GET_BY_ID",
      payload: data.data
    })
  }
}

export function createPoke(obj){
  return async function(){
    await axios.post('http://localhost:3001/pokemons', obj)
  }
}

export function getTypes(){
  return async function(dispatch){
    let types = await axios.get('http://localhost:3001/types')
    return dispatch({
      type: "GET_TYPES",
      payload: types.data
    })
  }
}