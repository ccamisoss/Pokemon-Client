const axios = require('axios');
const { Pokemon, Tipo } = require('../db')

module.exports={
    getAll: async (req,res,next) => {
       try { // if(req.query){
        //     // buscar x query
        // }else{
            let data = await axios.get('https://pokeapi.co/api/v2/pokemon/')
            let e = [];
            data.data.results.map(async p => {
                let d = await axios.get(p.url)
                let form = await axios.get(d.data.forms[0].url)

                let aux = []
                form.data.types.map(t => {
                    aux.push(t.type.name)
                })

                e.push({
                    name: "p.name",
                    image: form.data.sprites.front_default,
                    types: aux
                })
            })
            res.json(e)
        // }
        }catch (error){
            next(error)
        }
    },
    getById: (req,res,next) => {
        let id = req.params.id
        axios.get('https://pokeapi.co/api/v2/pokemon/' + id)
        .then(r => res.json({
            id:id,
            name: r.data.name,
            hp: r.data.stats[0].base_stat,
            attack: r.data.stats[1].base_stat,
            defense: r.data.stats[2].base_stat,
            speed: r.data.stats[5].base_stat,
            height: r.data.height,
            weight: r.data.weight,
            image: r.data.sprites.front_default,
            types: r.data.types.map(t => t.type.name)
        }), async () => {
            let poke = await Pokemon.findByPk(id, {include: Tipo});
            res.json({
                id: poke.id,
                name: poke.name,
                hp: poke.hp,
                attack: poke.attack,
                defense: poke.defense,
                speed: poke.speed,
                height: poke.height,
                weight: poke.weight,
                image: "https://pbs.twimg.com/profile_images/1178942318981701634/d5qM22Ft_400x400.jpg",
                types: poke.tipos.map(t => t.name)
            })
        })
        .catch(next)
    },
    createPoke: async (req,res,next) => {
        try {
            let { pokemon, tipos } = req.body
            Pokemon.create(pokemon).then(async p => {
                // agrego los tipos
                tipos.map(async t => {
                    let type = await Tipo.findAll({where:{name: t}})
                    if(type.length > 0) await p.addTipo(type)
                })
            r = await Pokemon.findAll({where:{name:pokemon.name},include: Tipo})
            if(r.length < 1) res.json(':(')
            else res.json(r)
        })
        } catch (error) {
            next(error)
        };
    }
}