const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const PlayerSchema = require('./Schemas/PlayerSchema');

module.exports = function(connectionString){
    let Player;

    return{
        initialize: function() {
            console.log("Initializing connection to Player Data database...");
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
                    Player = db.model("Player", PlayerSchema);
                    console.log("Player Initialized");
                    resolve();
                });
            });
        },

        getPlayerById: function (id) {
            return new Promise((resolve, reject) => {
                console.log(`Fetching player by Id`);
                Player.find({ _id: id })
                .populate('userId')
                .populate('team')
                .populate('matches').exec().then(player => {
                        resolve(player);
                    }).catch(err => {
                        reject(err);
                    });
            });
        },

        createPlayer: function(player) {
            return new Promise((resolve, reject) => {
                let newPlayer = new Player(player);
                console.log(newPlayer);
                newPlayer.save(err => {
                    if (err) {
                        reject(`Error Saving player in database: ${err}`);
                    } else {
                        resolve(`New player added to database`);
                    }
                });           
            });
        }
    }
}