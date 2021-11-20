const { Tipo } = require('../db')

module.exports={
    getAll: async (req,res,next) => {
        try{
            Tipo.findAll().then(r => res.json(r))            
        } catch (error) {
            next(error)
        }
        
    }
}