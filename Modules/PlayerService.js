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
        }
    }
}