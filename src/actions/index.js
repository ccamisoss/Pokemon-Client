import axios from "axios";

export function getAllPokemons() {
  return async function (dispatch) {
    let data = await axios.get("http://localhost:3001/pokemons");
    return dispatch({
      type: "GET_POKEMONS",
      payload: data.data,
    });
  };
}

export function getByName(name) {
  return async function (dispatch) {
    let data = await axios.get("http://localhost:3001/pokemons?name=" + name);
    return dispatch({
      type: "GET_BY_NAME",
      payload: data.data,
    });
  };
}

export function getPokeById(id) {
  return async function (dispatch) {
    let data = await axios.get("http://localhost:3001/pokemons/" + id);
    return dispatch({
      type: "GET_BY_ID",
      payload: data.data,
    });
  };
}

export function createPoke(obj) {
  return async function () {
    await axios.post("http://localhost:3001/pokemons", obj);
  };
}

export function getTypes() {
  return async function (dispatch) {
    let types = await axios.get("http://localhost:3001/types");
    return dispatch({
      type: "GET_TYPES",
      payload: types.data,
    });
  };
}

export const filterPokemonsByType = (payload) => {
  return {
    type: "FILTER_BY_TYPE",
    payload: payload,
  };
};

export const filterPokemonsByOrigin = (payload) => {
  return {
    type: "FILTER_BY_ORIGIN",
    payload: payload,
  };
};

export const orderByName = (payload) => {
  return async function (dispatch) {
    let data = await axios.get("http://localhost:3001/sorted/name/" + payload);
    return dispatch({
      type: "ORDER_BY_NAME",
      payload: data.data,
    });
  };
};

export const orderByAttack = (payload) => {
  return async function (dispatch) {
    let data = await axios.get(
      "http://localhost:3001/sorted/fuerza/" + payload
    );
    return dispatch({
      type: "ORDER_BY_ATTACK",
      payload: data.data,
    });
  };
};
