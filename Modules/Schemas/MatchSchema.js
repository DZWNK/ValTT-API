const mongoose = require('mongoose')
const Schema = mongoose.Schema

const matchesSchema = new Schema({
    event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
    score: [{type: String}],
    winner: {type: String},
    loser: {type: String},
    winsNeeded: {type: Number},
    timePlayed: {type: Date, default: Date.now},
    teams: [{ //Team Preview
        id: {type: String}, //needs to be a reference to team object Id
        name: {type: String},
        activeStatus: {type: Boolean}
    }],
    dateCreated: {type: Date, default: Date.now},
    activeStatus: {type: Boolean},
    games: [{ //Game Preview
        score: {type: String},
		mapName: {type: String},
		status: {type: String},
        time: {type: String},
        rounds: [{
            winner: {type: String},
            loser: {type: String},
            winType: {type: String},
            planter: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
            defuser: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
            plantSite: {type: String},
            plantTime: {type: String},
            defuseTime: {type: String},
            teams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }],
            players: [{
                gun: {type: String},
                agent: {type: String},
                ultimateCast: {type: Number},
                assist: {type: Number},
                grenadeCast: {type: Number},
                ability1Cast: {type: Number},
                ability2Cast: {type: Number},
                score: {type: Number},
                economy: {
                    loadoutValue: {type: Number},
                    weapon: {type: String},
                    armor: {type: String},
                    spent: {type: Number},
                    remaining: {type: Number}
                },
                kills: [{
                    victim: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
                    shots: {
                        damage: {type: Number},
                        headshots: {type: Number},
                        bodyshots: {type: Number},
                        legshots: {type: Number}
                    }
                }],
                death: {type: Boolean},
                deathLocation: {
                    x: {type: Number},
                    y: {type: Number}
                }
            }]
        }]
    }]
})

matchesSchema.pre('findOne', function(next) {
    this.populate('event')
    .populate('games.rounds.planter')
    .populate('games.rounds.defuser')
    .populate('games.rounds.teams')
    .populate('games.rounds.kills.victim');
    next();
});


const Match = mongoose.model('Match', matchesSchema)

//exports allows us to use Profile anywhere in the application
module.exports = Match
module.exports = matchesSchema

//try object.id as a reference