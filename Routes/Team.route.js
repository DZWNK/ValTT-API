const express = require('express')
const router = express.Router()
const createError = require('http-errors')

const Match = require('../Models/Match.model')
const Event = require('../Models/Event.model')
const Team = require('../Models/Team.model')
const User = require('../Models/User.model')
const Player = require('../Models/Player.model')

//get all teams
router.get('/teams', async(req, res, next) =>{
    try{
        const teams = await Team.find({}).populate('CoachId')
        .populate('currentRoster')
        .populate('upcomingMatches')
        .populate('pastMatches')
        .populate('eventHistory')
        .exec((err, teams) =>{
            if(err){
                throw createError.NotFound()
            }
            console.log(teams) //for debug purposes
            res.json(teams) //send back the events in json format 
        })
    }catch(error){
          next(error)
    }
})

//get Team by team name
router.get('/team', async(req, res, next)=>{
    try{
         const team = await Team.findOne({teamName: req.query.teamName})
         if(!team){
            throw createError.NotFound(`Team ${req.query.teamName} doesn't exist. Please try a different team name`)
         }

         res.json(team)
    }catch(error){
        next(error)
    }
})

module.exports = router