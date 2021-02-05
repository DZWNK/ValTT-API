const express = require('express')
const router = express.Router()
const createError = require('http-errors')
const db = require('../helpers/init_mongodb')

const Match = require('../Models/Match.model')
const Event = require('../Models/Event.model')
const Team = require('../Models/Team.model')
const User = require('../Models/User.model')
const Player = require('../Models/Player.model')

//Get all the events
router.get('/events', async(req, res, next) =>{
    try{
        const events = await Event.find({}).populate('brackets.matches')
        .exec((error, events)=>{
          if(error){
              throw createError.NotFound()
          }
          res.json(events)
        })
    }catch(error){
          next(error)
    }
})

//Get all running events
router.get('/running', async(req, res, next) =>{
      try{
          const runningEvents = await Event.find({runningStatus: true}).populate('brackets.matches')
          .exec((error, events)=>{
            if(error){
                throw createError.NotFound()
            }
            res.json(events)
          })
      }catch(error){
        next(error)
      }
})


module.exports = router
