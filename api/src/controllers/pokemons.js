const axios = require("axios");
const { Pokemon, Tipo } = require("../db");

module.exports = {
  getAll: async (req, res, next) => {
    try {
      var { name } = req.query;
      if (name) {
        let pokemon = await Pokemon.findOne({
          where: { name: name.toLowerCase() },
          include: Tipo,
        });
        if (pokemon) {
          let formatted = {
            id: pokemon.id,
            name: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
            image: pokemon.image,
            types: pokemon.tipos.map(
              (t) => t.name.charAt(0).toUpperCase() + t.name.slice(1)
            ),
          };
          res.json(formatted);
        } else {
          res.send("No se encontró el pokemon solicitado");
        }
      } else {
        let db = await Pokemon.findAll({ include: Tipo });
        let formatted = db.map((p) => {
          return {
            id: p.id,
            name: p.name.charAt(0).toUpperCase() + p.name.slice(1),
            image: p.image,
            types: p.tipos.map(
              (t) => t.name.charAt(0).toUpperCase() + t.name.slice(1)
            ),
          };
        });
        res.status(200).json(formatted);
      }
    } catch (error) {
      next(error);
    }
  },
  getById: (req, res, next) => {
    try {
      let { id } = req.params;
      Pokemon.findByPk(id, { include: Tipo }).then(
        (poke) => {
          let formatted = {
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
          };
          res.json(formatted);
        },
        () => res.json(undefined)
      );
    } catch (error) {
      next(error);
    }
  },
  createPoke: async (req, res, next) => {
    try {
      let { pokemon, tipos } = req.body;
      pokemon = {
        ...pokemon,
        createdInDB: true,
        image:
          "https://64.media.tumblr.com/e3b1c855ebcbe33d1f7dc55d25335a93/5150765739d24b24-93/s540x810/b0d751a165cf947d89e3af30fbe3d77e2f4a9566.png",
      };
      Pokemon.create(pokemon).then(async (p) => {
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
      let { by, order } = req.params;
      let db = await Pokemon.findAll({ include: Tipo });
      let allPokes = db.map((p) => {
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
      } else {
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
    } catch (error) {
      next(error);
    }
  },
};
