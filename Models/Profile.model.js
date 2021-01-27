const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

//Creating schema for Profile (logging in or signing up)
const profilesSchema = new Schema({
    email:{
        type: String,
        required: true,
        lowercase: true, //avoids case sensitivity
        unique: true     //only one email per profile
    },
    passWord:{
        type: String,
        required: true
    }
})

//fired before mongoose tries to save a profile to database  NOTE: After saving it's .post('save)
profilesSchema.pre('save' , async function(next){
      try{
          const salt = await bcrypt.genSalt(10)  //could use 8 but 10 is more encrypted
          const hashedPassWord = await bcrypt.hash(this.passWord, salt) //hashes the password
          this.passWord = hashedPassWord
          next()
      }catch(error){
          next(error)
      }
})

profilesSchema.methods.isValidPassword = async function(passWord){
       try{
           //returns a boolean if the password matches
           return await bcrypt.compare(passWord , this.passWord)
       }catch(error){
           throw error
       }
}

const Profile = mongoose.model('Profile', profilesSchema)

//exports allows us to use Profile anywhere in the application
module.exports = Profile