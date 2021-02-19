const mongoose = require('mongoose')
const Schema = mongoose.Schema

const playersSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    kills: {type: Number},
    deaths: {type: Number},
    assists: {type: Number},
    firstBloods: {type: Number},
    firstDeaths: {type: Number},
    team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
    matches: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Match' }]
})

playersSchema.pre('findOne', function(next) {
    this.populate('userId')
    .populate('team')
    .populate('matches');
    next();
});

//const Player = mongoose.model('Player', playersSchema)

//exports allows us to use Profile anywhere in the application
module.exports = playersSchema