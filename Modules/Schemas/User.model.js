const mongoose = require('mongoose')
const Schema = mongoose.Schema

const usersSchema = new Schema({
    playerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
    userName: {type: String, unique: true, required: true},
    passWord: {type: String, required: true},
    favourites: [{type: String}],
    riotId: {type: String},
    isAdmin: {type: Boolean},
    isCoach: {type: Boolean},
    isEventOrganizer: {type: Boolean},
})

usersSchema.pre('findOne', function(next) {
    this.populate('playerId');
    next();
});

const User = mongoose.model('User', usersSchema)

//exports allows us to use User anywhere in the application
module.exports = User