const { date } = require('@hapi/joi')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const teamsSchema = new Schema({
    teamPic: {type: String},  //urls will need to be verified
    website: {type: String},
    CoachId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    teamName: {type: String, unique: true},
    dateCreated: {type: Date, default: Date.now},
    activeStatus: {type: Boolean},
    currentRoster: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }],
    upcomingMatches: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Match' }],
    pastMatches: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Match' }],
    extraMatches: {type: Boolean},
    eventHistory: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' }
})

teamsSchema.pre('findOne', function(next) {
    this.populate('CoachId')
    .populate('currentRoster')
    .populate('upcomingMatches')
    .populate('pastMatches')
    .populate('eventHistory');
    next();
});
 
const Team = mongoose.model('Team', teamsSchema)

//exports allows us to use User anywhere in the application
module.exports = Team
module.exports = teamsSchema