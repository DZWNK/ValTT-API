const express = require('express')
const router = express.Router()
const createError = require('http-errors')

const Match = require('../Modules/Schemas/Match.model')

router.get('/matches', async(req, res, next) =>{
    try{
        const matches = await Match.find({}).populate('event')
        .populate('teams.team')
        .populate('games.rounds.planter')
        .populate('games.rounds.defuser')
        .populate('games.rounds.teams')
        .populate('games.rounds.kills.victim')
        .exec((err, matches) =>{
            if(err){
                throw createError.NotFound('Matches Not Found from database')
            }
            console.log(matches) //for debug purposes
            res.json(matches) //send back the events in json format 
        })
    }catch(error){
          next(error)
    }
})

module.exports = router