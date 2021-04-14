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
                Event.find({_id: id}).exec().then(events => {
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

        updateEvent: function(event, id) {
            return new Promise((resolve, reject) => {
                let options = {new: true};
                console.log(event.brackets[0].matches);
                Event.findByIdAndUpdate(id, event, options).exec().then(eventUpd =>{
                    for(let j=0; j<event.brackets[0].matches.length; j++){        
                        eventUpd.brackets[0].matches.push(event.brackets[0].matches[j]);
                    }
                    resolve('Event successfully updated')
                }).catch(err => {
                    reject(`Error updating event in database: ${err}`);
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
                        resolve(`New event added to database`);
                    }
                }); 
            });
        }
    }
}

                /* For creating new Event
                let newEvent = new Event(event);
                console.log(newEvent);
                newEvent.save(err => {
                    if (err) {
                        reject(`Error Saving event in database: ${err}`);
                    } else {
                        resolve(`New event added to database`);
                    }
                });   */ 