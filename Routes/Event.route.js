const express = require('express')
const router = express.Router()
const createError = require('http-errors')

const Event = require('../Modules/Schemas/EventSchema')
const eventService = require("../Modules/EventService")

//GET all the events
router.get('/events', (req, res, next) =>{
  eventData.getAllEvents().then((events)=>{
        if(events[0] != null){
            res.json(events)
        }
        else {
          res.json({ message: 'Cannot Find Events' });
      }
  }).catch((err) => {
        next(err)
    });
})
//jwt 
function verifyToken(req, res, next) {
  //is the authorization key present in header?
  if(!req.headers.authorization) {
      return res.status(401).send('Unauthorized request')
  }// splitting on space which results into array, actual token variable is containing actual token value
  let token = req.headers.authorization.split(' ')[1]
  if (token === 'null') { // if its not present
      return res.status(401).send('Unauthorized request')
  } // if its present we verify
  let payload = jwt.verify(token, 'secretKey') // verify returns decoded token ONLY if it's valid
  if(!payload) { // if no payload
      return res.status(401).send('Unauthorized request')
  } //if all conditions pass we assign payload subject as the request user id, then pass on execution to the next handler
  req.userId = payload.subject
  next()
}
//Get all running events
router.get('/running', async(req, res, next) =>{
  eventData.getRunningEvents().then((runningEvents)=>{
    if(runningEvents[0] != null){
        res.json(runningEvents)
    }else{
      res.json({ message: 'Cannot Find Running Events' });
    }
  }).catch((err) => {
        next(err)
    });
})

///GET verified events
router.get('/verified', async(req, res, next) =>{

  eventData.getVerifiedFirstEvents(parseInt(req.query.page), parseInt(req.query.numfetched)).then((events)=>{
    if(events[0] != null){
        res.json(events)
    }else{
      res.json({ message: 'No verified Events available' });
    }
  }).catch((err) => {
        next(err)
    });
})

///GET featured events
router.get('/featured', async(req, res, next) =>{

  eventData.getFeaturedEvents(parseInt(req.query.page), parseInt(req.query.numfetched)).then((events)=>{
    if(events[0] != null){
        res.json(events)
    }else{
      res.json({ message: 'No featured Events available' });
    }
  }).catch((err) => {
        next(err)
    });
})

//GET unverified events
router.get('/unverified', async(req, res, next) =>{

  eventData.getUnverifiedFirstEvents(parseInt(req.query.page), parseInt(req.query.numfetched)).then((events)=>{
    if(events[0] != null){
        res.json(events)
    }else{
      res.json({ message: 'No unverified Events available' });
    }
  }).catch((err) => {
        next(err)
    });
})

//GET Event by Id
router.get('/event', async(req, res, next) =>{

  eventData.getEventById(req.query.id).then((events)=>{
    if(events[0] != null){
        res.json(events)
    }else{
      res.json({ message: `No Event with specified Id ${req.query.id} available` });
    }
  }).catch((err) => {
        next(err)
    });
})

//POST for creating new Event
router.post('/newEvent', async(req, res, next) =>{

  eventData.getEventById(req.body.id).then((events)=>{
    if(events[0] == null){
        //do the insert
        eventData.createEvent(req.body).then((msg) => {
          res.json({ message: msg });
      }).catch((err) => {
          res.json({ message: `An error occured adding Event to database: ${err}` });
      });
    }else{
      res.json({ message: `Event already exists in Database` });
    }
  }).catch((err) => {
        next(err)
    });
})

module.exports = router
