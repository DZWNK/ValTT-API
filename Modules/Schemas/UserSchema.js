const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt');

const profilesSchema = new Schema({
    playerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
    dateCreated: {type: Date},
    userName: {type: String, unique: true, required: true},
    passWord: {type: String, required: true},
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

//const User = mongoose.model('User', profilesSchema)

//exports allows us to use User anywhere in the application
module.exports = profilesSchema