const express = require("express");
const { getAll } = require("../controllers/tipos");
const server = express();

server.get("/", getAll);

module.exports = server;
