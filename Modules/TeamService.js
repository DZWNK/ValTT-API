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
                Team.find({}).exec().then(teams => {
                    resolve(teams);
                }).catch(err => {
                    reject(err);
                });
            });
        },

        // Get team in database by Username
        getTeamByName: function(data) {
            return new Promise((resolve, reject) => {
                console.log(`Finding team by team name: ${data}`);
                Team.findOne({ teamName: data }).exec().then(team => {
                    resolve(team);
                }).catch(err => {
                    reject(err);
                });
            });
        },

        getTeamById: function(id) {
            return new Promise((resolve, reject) => {
                console.log(`Finding team by team id: ${data}`);
                Team.find({ _id: id }).exec().then(team => {
                    resolve(team);
                }).catch(err => {
                    reject(err);
                });
            });
        },

        getVerifiedTeams: function() {
            return new Promise((resolve, reject) => {
                console.log(`Finding team by verified status`);
                Team.find({ verified: true }).exec().then(teams => {
                    var teamPreview = [{
                        id: String,
                        name: String,
                        activeStatus: Boolean
                      }];
                      teamPreview.length = 0;
                      for(var i=0; i<teams.length; i++) {
                          let team = {
                            id: teams[i]._id,
                            name: teams[i].teamName,
                            activeStatus: teams[i].activeStatus
                          };
                        teamPreview.push(team);
                      }
                    resolve(teamPreview);
                }).catch(err => {
                    reject(err);
                });
            });
        },

        addNewTeam: function(newTeam){
            return new Promise((resolve, reject) => {
                let team = new Team(newTeam);
                console.log(team);
                team.save(err => {
                    if (err) {
                        reject(`Error Saving team in database: ${err}`);
                    } else {
                        resolve(`New team added to database`);
                    }
                });  
            });
    }
    }
}

