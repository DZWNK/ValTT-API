const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const MatchSchema = require('./Schemas/MatchSchema');

module.exports = function(connectionString){
    let Match;

    return{
        initialize: function() {
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
                    Match = db.model("Player", MatchSchema);
                    console.log("Match Initialized");
                    resolve();
                });
            });
        }
    }
}