const express = require('express')
const router = express.Router()
const createError = require('http-errors')

const Event = require('../Modules/Schemas/EventSchema')
const eventService = require("../Modules/EventService")

//throw createError.NotFound()
//Get all the events
router.get('/events', verifyToken, (req, res, next) =>{
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
