const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const teamsSchema = require('./Schemas/TeamSchema');

module.exports = function(connectionString){
    let Team;

    return{
        initialize: function() {
            console.log("Initializing connection to Team Data database...");
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
                    Team = db.model("Team", teamsSchema);
                    console.log("Team Initialized");
                    resolve();
                });
            });
        },

        getAllTeams: function() {
            return new Promise((resolve, reject) => {
                console.log(`Fetching all teams`);
                Team.find({}).populate('CoachId')
                .populate('currentRoster')
                .populate('upcomingMatches')
                .populate('pastMatches')
                .populate('eventHistory').exec().then(teams => {
                    resolve(teams);
                }).catch(err => {
                    reject(err);
                });
            });
        },

        // Get user in database by Username
        getTeamByName: function(data) {
            return new Promise((resolve, reject) => {
                console.log(`Finding team by team name: ${data}`);
                Profile.findOne({ teamName: data }).exec().then(team => {
                    resolve(team);
                }).catch(err => {
                    reject(err);
                });
            });
        }
    }
}