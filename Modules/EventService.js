const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const EventsSchema = require('./Schemas/EventSchema');

module.exports = function(connectionString){
    let Event;

    return{
        initialize: function() {
            console.log("Initializing connection to Event Data database...");
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
                    Event = db.model("Event", EventsSchema);
                    console.log("Event Initialized");
                    resolve();
                });
            });
        },

        //Get all the events
        getAllEvents: function() {
            return new Promise((resolve, reject) => {
                console.log(`Fetching all events`);
                Event.find({}).populate('brackets.matches').exec().then(events => {
                    resolve(events);
                }).catch(err => {
                    reject(err);
                });
            });
        },

        getRunningEvents: function() {
            return new Promise((resolve, reject) => {
                Event.find({runningStatus: true}).populate('brackets.matches').exec().then(events => {
                    resolve(events);
                }).catch(err => {
                    reject(err);
                });
            });
        }
    }
}