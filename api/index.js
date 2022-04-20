const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const { Tipo, Pokemon } = require("./src/db");
const axios = require("axios");

// Here I precharge the database with pokemons and pokemon types from the pokeAPI
conn.sync().then(async () => {
  let types = await Tipo.findAll();
  let pokemons = await Pokemon.findAll();
  if (types.length < 1 && pokemons.length < 1) {
    axios.get("https://pokeapi.co/api/v2/type").then((r) => {
      r.data.results.map(async (type) => {
        await Tipo.create({
          name: type.name,
        });
      });
    });
    axios
      .get("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=70")
      .then((response) => {
        Promise.all(
          response.data.results.map(async (pokemon) => {
            let pokeInfo = await axios.get(pokemon.url);
            return {
              name: pokemon.name,
              info: pokeInfo.data,
            };
          })
        ).then(async (result) => {
          result.map(async (poke, index) => {
            let newPoke = await Pokemon.create({
              name: poke.name.charAt(0).toUpperCase() + poke.name.slice(1),
              createdInDB: false,
              hp: poke.info.stats[0].base_stat,
              attack: poke.info.stats[1].base_stat,
              defense: poke.info.stats[2].base_stat,
              speed: poke.info.stats[5].base_stat,
              height: poke.info.height,
              weight: poke.info.weight,
              image: poke.info.sprites.front_default,
            });
            poke.info.types.map(async (type) => {
              let foundType = await Tipo.findOne({
                where: { name: type.type.name },
              });
              await newPoke.addTipo(foundType);
            });
          });
        });
      });
    server.listen(3001, () => {
      console.log("%s listening at 3001");
    });
  } else {
    server.listen(3001, () => {
      console.log("%s listening at 3001");
    });
  }
});
