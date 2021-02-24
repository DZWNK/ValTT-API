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

        getVerifiedFirstEvents: function(pageNum, numFetched) {
            return new Promise((resolve, reject) => {
                console.log(`Fetching paged verified events`);
                if(pageNum == 1){
                    pageNum = 0;
                }else{
                    pageNum = (pageNum*10) - 1;
                }
                Event.find({verified: true}).populate('brackets.matches').skip(pageNum).limit(numFetched).exec().then(events => {
                    resolve(events);
                }).catch(err => {
                    reject(err);
                });
            });
        },

        getUnverifiedFirstEvents: function(pageNum, numFetched) {
            return new Promise((resolve, reject) => {
                console.log(`Fetching paged unverified events`);
                if(pageNum == 1){
                    pageNum = 0;
                }else{
                    pageNum = (pageNum*10) - 1;
                }
                Event.find({verified: false}).populate('brackets.matches').skip(pageNum).limit(numFetched).exec().then(events => {
                    resolve(events);
                }).catch(err => {
                    reject(err);
                });
            });
        },

        getEventById: function(id) {
            return new Promise((resolve, reject) => {
                console.log(`Fetching event by Id`);
                Event.find({_id: id}).populate('brackets.matches').exec().then(events => {
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
        },

        createEvent: function(event) {
            return new Promise((resolve, reject) => {
                let newEvent = new Event(event);
                console.log(newEvent);
                newEvent.save(err => {
                    if (err) {
                        reject(`Error Saving event in database: ${err}`);
                    } else {
                        resolve(`New event added to database: ${user}`);
                    }
                });
                
            });
        }
    }
}