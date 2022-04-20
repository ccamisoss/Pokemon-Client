const express = require("express");
const { getAll, getById, createPoke } = require("../controllers/pokemons");
const server = express();

server.get("/", getAll);

server.get("/:id", getById);

server.post("/", createPoke);

module.exports = server;
