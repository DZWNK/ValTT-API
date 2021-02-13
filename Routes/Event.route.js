const express = require('express')
const router = express.Router()
const createError = require('http-errors')

const Event = require('../Modules/Schemas/EventSchema')
const eventService = require("../Modules/EventService")

//throw createError.NotFound()
//Get all the events
router.get('/events', (req, res, next) =>{
  eventData.getAllEvents().then((events)=>{
        if(events != null){
            res.json(events)
        }
        else {
          res.json({ message: 'Cannot Find Events' });
      }
  }).catch((err) => {
        next(err)
    });
})

//Get all running events
router.get('/running', async(req, res, next) =>{
  eventData.getRunningEvents().then((runningEvents)=>{
    if(runningEvents != null){
        res.json(runningEvents)
    }else{
      res.json({ message: 'Cannot Find Running Events' });
    }
  }).catch((err) => {
        next(err)
    });
})


module.exports = router
