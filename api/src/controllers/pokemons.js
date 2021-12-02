const axios = require("axios");
const { Pokemon, Tipo } = require("../db");

module.exports = {
  getAll: async (req, res, next) => {
    try {
      let name = req.query.name;
      if (name) {
        let db = await Pokemon.findOne({
          where: { name: name.toLowerCase() },
          include: Tipo,
        });
        if (!db) {
          axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`).then(
            (r) => {
              res.json({
                id: r.data.id,
                name: name.charAt(0).toUpperCase() + name.slice(1),
                image: r.data.sprites.front_default,
                types: r.data.types.map(
                  (t) =>
                    t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1)
                ),
              });
            },
            () => res.send("No se encontró el pokemon solicitado")
          );
        } else {
          res.json({
            id: db.id,
            name: db.name.charAt(0).toUpperCase() + db.name.slice(1),
            image: db.image,
            types: db.tipos.map(
              (t) => t.name.charAt(0).toUpperCase() + t.name.slice(1)
            ),
          });
        }
      } else {
        let db = await Pokemon.findAll({ include: Tipo });
        let formatted = db.map((p) => {
          return {
            id: p.id,
            name: p.name.charAt(0).toUpperCase() + p.name.slice(1),
            image: p.image,
            createdInDB: true,
            types: p.tipos.map(
              (t) => t.name.charAt(0).toUpperCase() + t.name.slice(1)
            ),
          };
        });
        axios
          .get("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=40")
          .then((r) => {
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
                  id: poke.info.id,
                  name: poke.name.charAt(0).toUpperCase() + poke.name.slice(1),
                  image: poke.info.sprites.front_default,
                  createdInDB: false,
                  types: poke.info.types.map(
                    (t) =>
                      t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1)
                  ),
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
            name: r.data.name.charAt(0).toUpperCase() + r.data.name.slice(1),
            hp: r.data.stats[0].base_stat,
            attack: r.data.stats[1].base_stat,
            defense: r.data.stats[2].base_stat,
            speed: r.data.stats[5].base_stat,
            height: r.data.height,
            weight: r.data.weight,
            image: r.data.sprites.front_default,
            types: r.data.types.map(
              (t) => t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1)
            ),
          }),
        async () => {
          let poke = await Pokemon.findByPk(id, { include: Tipo });
          res.json({
            id: poke.id,
            name: poke.name.charAt(0).toUpperCase() + poke.name.slice(1),
            hp: poke.hp,
            attack: poke.attack,
            defense: poke.defense,
            speed: poke.speed,
            height: poke.height,
            weight: poke.weight,
            image: poke.image,
            types: poke.tipos.map(
              (t) => t.name.charAt(0).toUpperCase() + t.name.slice(1)
            ),
          });
        }
      )
      .catch(next);
  },
  createPoke: async (req, res, next) => {
    try {
      let { pokemon, tipos } = req.body;
      pokemon = {
        ...pokemon,
        image:
          "https://64.media.tumblr.com/e3b1c855ebcbe33d1f7dc55d25335a93/5150765739d24b24-93/s540x810/b0d751a165cf947d89e3af30fbe3d77e2f4a9566.png",
      };
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
        res.json(r);
      });
    } catch (error) {
      next(error);
    }
  },
  getOrdered: async (req, res, next) => {
    try {
      let by = req.params.by;
      let order = req.params.order;
      let db = await Pokemon.findAll({ include: Tipo });
      let formatted = db.map((p) => {
        return {
          id: p.id,
          attack: p.attack,
          name: p.name.charAt(0).toUpperCase() + p.name.slice(1),
          image: p.image,
          createdInDB: true,
          types: p.tipos.map(
            (t) => t.name.charAt(0).toUpperCase() + t.name.slice(1)
          ),
        };
      });
      axios
        .get("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=40")
        .then((r) => {
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
                id: poke.info.id,
                attack: poke.info.stats[1].base_stat,
                name: poke.name.charAt(0).toUpperCase() + poke.name.slice(1),
                image: poke.info.sprites.front_default,
                createdInDB: false,
                types: poke.info.types.map(
                  (t) =>
                    t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1)
                ),
              };
            });
            const allPokes = formatted.concat(result);
            if (by === "name") {
              if (order === "asc") {
                allPokes.sort((a, b) => {
                  if (a.name > b.name) return 1;
                  if (b.name > a.name) return -1;
                  return 0;
                });
                res.json(allPokes);
              } else {
                allPokes.sort((a, b) => {
                  if (a.name > b.name) return -1;
                  if (b.name > a.name) return 1;
                  return 0;
                });
                res.json(allPokes);
              }
            }else{
              if (order === "asc") {
                allPokes.sort((a, b) => {
                  if (a.attack > b.attack) return 1;
                  if (b.attack > a.attack) return -1;
                  return 0;
                });
                res.json(allPokes);
              } else {
                allPokes.sort((a, b) => {
                  if (a.attack > b.attack) return -1;
                  if (b.attack > a.attack) return 1;
                  return 0;
                });
                res.json(allPokes);
              }
            }
          });
        });
    } catch (error) {
      next(error);
    }
  },
};
