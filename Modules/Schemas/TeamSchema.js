const { date } = require('@hapi/joi')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const teamsSchema = new Schema({
    teamPic: {type: String},
    verified: {type: Boolean},
    website: {type: String},
    CoachId: { //Player Preview
        id: {type: String},
        name: {type: String},
        team: {
            id: {type: String}, //needs to be a reference to team object Id
            name: {type: String},
            activeStatus: {type: Boolean}
        }
    },  //{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    teamName: {type: String, unique: true},
    dateCreated: {type: Date, default: Date.now},
    activeStatus: {type: Boolean},
    currentRoster: [{ //Player Preview
        id: {type: String},
        name: {type: String},
        team: {
            id: {type: String}, //needs to be a reference to team object Id
            name: {type: String},
            activeStatus: {type: Boolean}
        }
    }],
    upcomingMatches: [
        { //Match Preview
            id: {type: String},
            teams: [{ //Team preview
                id: {type: String}, //needs to be a reference to team object Id
                name: {type: String},
                activeStatus: {type: Boolean}
            }],
            score: {type: String},
            winner: {type: String},
            loser: {type: String},
            activeStatus: {type: Boolean},
            timePlayed: {type: Date, default: Date.now},
            winsNeeded: {type: Number},
            prize: {type: String}
         }
    ],
    pastMatches: [
        { //Match Preview
            id: {type: String},
            teams: [{ //Team preview
                id: {type: String}, //needs to be a reference to team object Id
                name: {type: String},
                activeStatus: {type: Boolean}
            }],
            score: {type: String},
            winner: {type: String},
            loser: {type: String},
            activeStatus: {type: Boolean},
            timePlayed: {type: Date, default: Date.now},
            winsNeeded: {type: Number}
         }
    ],
    extraMatches: {type: Boolean},
    eventHistory: { 
        id: {type: String},
        name: {type: String},
        runningStatus: {type: Boolean},
        startDate: {type: Date, default: Date.now},
        endDate: {type: Date, default: Date.now}
     }
})

teamsSchema.pre('findOne', function(next) {
    next();
});
 
const Team = mongoose.model('Team', teamsSchema)

//exports allows us to use User anywhere in the application
module.exports = Team
module.exports = teamsSchema

/*
    .populate('currentRoster')
    .populate('upcomingMatches')
    .populate('pastMatches')
    .populate('eventHistory');
*/