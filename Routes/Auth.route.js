//Handles all the routes
const express = require('express')
const router = express.Router()
const createError = require('http-errors')
const Profile = require('../Models/Profile.model')
const { authSchema } = require('../helpers/validation_schema')


router.post('/signup', async(req, res, next)=>{
    try{
       //Validates the request body and throws error if unsuccesful validation
       const result = await authSchema.validateAsync(req.body)

       //check if the profile already exists
       const doesProfileExist = await Profile.findOne({email: result.email})

       //if profile exists throw conflict error
       if(doesProfileExist){
           throw createError.Conflict(`${result.email} is already registered`)
       }

       //create the new user from result and save to database
       const profile = new Profile(result)
       const savedProfile = await profile.save()

       res.send(savedProfile)  //we should return a JWT token instead
    }catch(error){
        if(error.isJoi === true) {
            error.status = 422 //422 is unprocessible entity
        }
        next(error) //calls the error handler
    }
})

router.post('/login', async(req, res, next)=>{
    try{
       //validate req and check if profile exists in database
       const result = await authSchema.validateAsync(req.body)
       const doesProfileExist = await Profile.findOne({email: result.email})

       if(!doesProfileExist){
           throw createError.NotFound('Profile not registered')
       }

       const matchFound = await doesProfileExist.isValidPassword(result.passWord)

       //if password doesn't match send 401 unauthorized error
       if(!matchFound){
           throw createError.Unauthorized('Username/Password is not valid')
       }
       res.send(result)  //we need to send an access token instead
    }catch(error){
        if(error.isJoi === true) {
            next(createError.BadRequest('Invalid Username/Password'))
        }
         next(error)
    }
})

router.delete('/logout', async(req, res, next)=>{
    //To be implemented
    res.send('Logout Route')
})

//allows us to use router anywhere in the app
module.exports = router