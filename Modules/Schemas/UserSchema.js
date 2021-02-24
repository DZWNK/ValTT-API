const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt');

const profilesSchema = new Schema({
    playerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
    dateCreated: {type: Date},
    username: {type: String, unique: true, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    favourites: [{type: mongoose.Schema.Types.ObjectId}], //ref to what exactly ??
    riotId: {type: String},
    isAdmin: {type: Boolean},
    isCoach: {type: Boolean},
    isEventOrganizer: {type: Boolean},
})

profilesSchema.pre('findOne', function(next) {
    this.populate('playerId')
    .populate('favourites');
    next();
});

const Profile = mongoose.model('User', profilesSchema)

//exports allows us to use User anywhere in the application
module.exports = Profile
module.exports = profilesSchema

/*
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
*/