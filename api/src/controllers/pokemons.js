const axios = require("axios");
const { Pokemon, Tipo } = require("../db");

module.exports = {
  getAll: async (req, res, next) => {
    try {
      let name = req.query.name.toLowerCase();
      if (name) {
        let db = await Pokemon.findOne({ where: { name: name }, include: Tipo });
        if (!db) {
          axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`).then((r) => {
            res.json({
              name: name,
              image: r.data.sprites.front_default,
              types: r.data.types.map((t) => t.type.name),
            });
          },() => res.send('No se encontró el pokemon solicitado'));
        } else {
          res.json({
              name: db.name,
              image: db.image,
              types: db.tipos.map((t) => t.name)
          });
        }
      } else {
        let db = await Pokemon.findAll({include:Tipo})
        let formatted = db.map(p => {
            return{
                name: p.name,
                image: p.image,
                types: p.tipos.map((t) => t.name)
            }
        })
        axios.get("https://pokeapi.co/api/v2/pokemon/").then((r) => {
          Promise.all(
            r.data.results.map(async (p) => {
              let pokeInfo = await axios.get(p.url);
              return {
                name: p.name,
                info: pokeInfo.data,
              };
            })
          ).then((array) => {
            let result = array.map((poke) => {
              return {
                name: poke.name,
                image: poke.info.sprites.front_default,
                types: poke.info.types.map((t) => t.type.name),
              };
            });
            res.json(formatted.concat(result));
          });
        });
      }
    } catch (error) {
      next(error);
    }
  },
  getById: (req, res, next) => {
    let id = req.params.id;
    axios
      .get("https://pokeapi.co/api/v2/pokemon/" + id)
      .then(
        (r) =>
          res.json({
            id: id,
            name: r.data.name,
            hp: r.data.stats[0].base_stat,
            attack: r.data.stats[1].base_stat,
            defense: r.data.stats[2].base_stat,
            speed: r.data.stats[5].base_stat,
            height: r.data.height,
            weight: r.data.weight,
            image: r.data.sprites.front_default,
            types: r.data.types.map((t) => t.type.name),
          }),
        async () => {
          let poke = await Pokemon.findByPk(id, { include: Tipo });
          res.json({
            id: poke.id,
            name: poke.name,
            hp: poke.hp,
            attack: poke.attack,
            defense: poke.defense,
            speed: poke.speed,
            height: poke.height,
            weight: poke.weight,
            image: poke.image,
            types: poke.tipos.map((t) => t.name),
          });
        }
      )
      .catch(next);
  },
  createPoke: async (req, res, next) => {
    try {
      let { pokemon, tipos } = req.body;
      pokemon = {...pokemon, image: "https://pbs.twimg.com/profile_images/1178942318981701634/d5qM22Ft_400x400.jpg"}
      Pokemon.create(pokemon).then(async (p) => {
        // agrego los tipos
        tipos.map(async (t) => {
          let type = await Tipo.findAll({ where: { name: t } });
          if (type.length > 0) await p.addTipo(type);
        });
        r = await Pokemon.findAll({
          where: { name: pokemon.name },
          include: Tipo,
        });
        if (r.length < 1) res.json(":(");
        else res.json(r);
      });
    } catch (error) {
      next(error);
    }
  },
};
