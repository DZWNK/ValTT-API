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
                Event.find({}).exec().then(events => {
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
                }
                Event.find({verified: true}).skip(pageNum).limit(numFetched).exec().then(events => {
                    var eventPreview = [{
                        id: String,
                        name: String,
                        runningStatus: Boolean,
                        startDate: Date,
                        endDate: Date
                      }];
                      eventPreview.length = 0;
                      events.forEach(e => {
                          let event ={
                            id: e._id,
                            name: e.name,
                            runningStatus: e.runningStatus,
                            startDate: e.startDate,
                            endDate: e.endDate
                          };
                            eventPreview.push(event);                    
                      });
                    resolve(eventPreview);
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
                }
                Event.find({verified: false}).skip(pageNum).limit(numFetched).exec().then(events => {
                    var eventPreview = [{
                        id: String,
                        name: String,
                        runningStatus: Boolean,
                        startDate: Date,
                        endDate: Date
                      }];
                      eventPreview.length = 0;
                      events.forEach(e => {
                          let event ={
                            id: e._id,
                            name: e.name,
                            runningStatus: e.runningStatus,
                            startDate: e.startDate,
                            endDate: e.endDate
                          };
                        eventPreview.push(event);
                      });
                    resolve(eventPreview);
                }).catch(err => {
                    reject(err);
                });
            });
        },


        getFeaturedEvents: function(pageNum, numFetched) {
            return new Promise((resolve, reject) => {
                console.log(`Fetching paged unverified events`);
                if(pageNum == 1){
                    pageNum = 0;
                }
                Event.find({featured: true}).skip(pageNum).limit(numFetched).exec().then(events => {
                    var eventPreview = [{
                        id: String,
                        name: String,
                        runningStatus: Boolean,
                        startDate: Date,
                        endDate: Date
                      }];
                      eventPreview.length = 0;
                      events.forEach(e => {
                          let event ={
                            id: e._id,
                            name: e.name,
                            runningStatus: e.runningStatus,
                            startDate: e.startDate,
                            endDate: e.endDate
                          };
                        eventPreview.push(event);
                      });
                    resolve(eventPreview);
                }).catch(err => {
                    reject(err);
                });
            });
        },

        getEventById: function(id) {
            return new Promise((resolve, reject) => {
                console.log(`Fetching event by Id`);
                Event.findById(id).exec().then(events => {
                    resolve(events);
                }).catch(err => {
                    reject(err);
                });
            });
        },

        getRunningEvents: function() {
            return new Promise((resolve, reject) => {
                Event.find({runningStatus: true}).exec().then(events => {
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