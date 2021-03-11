const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const MatchSchema = require('./Schemas/MatchSchema');

module.exports = function (connectionString) {
    let Match;

    return {
        initialize: function () {
            console.log("Initializing connection to Match Data database...");
            return new Promise((resolve, reject) => {
                let db = mongoose.createConnection(connectionString, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                });
                db.on('error', () => {
                    reject();
                });
                db.once('open', () => {
                    console.log("Database connection established");
                    Match = db.model("Match", MatchSchema);
                    console.log("Match Initialized");
                    resolve();
                });
            });
        },


        getMatchById: function (id) {
            return new Promise((resolve, reject) => {
                console.log(`Fetching match by Id`);
                Match.find({ _id: id }).populate('event')
                    .populate('teams.team')
                    .populate('games.rounds.planter')
                    .populate('games.rounds.defuser')
                    .populate('games.rounds.teams')
                    .populate('games.rounds.kills.victim').exec().then(match => {
                        resolve(match);
                    }).catch(err => {
                        reject(err);
                    });
            });
        },

        getMatchesById: function (ids) {
            return new Promise((resolve, reject) => {
                console.log(`Fetching match by Id`);
                Match.find({ _id: { $in: ids } }).populate('event')
                    .populate('teams.team')
                    .populate('games.rounds.planter')
                    .populate('games.rounds.defuser')
                    .populate('games.rounds.teams')
                    .populate('games.rounds.kills.victim').exec().then(matches => {
                        resolve(matches);
                    }).catch(err => {
                        reject(err);
                    });
            });
        }

    }
}