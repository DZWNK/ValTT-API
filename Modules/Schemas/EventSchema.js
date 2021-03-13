const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EventsSchema = new Schema({
    runningStatus: {type: Boolean},
    dateCreated: {type: Date, default: Date.now},
    endDate: {type: Date},
    watchLink: {type: String}, //clickable link
    verified: {type: Boolean},
    featured: {type: Boolean},
    brackets: [{
        BracketName: {type: String},
        PushPerMatch: {type: Boolean},
        PushWinner: {type: Number},
        PushLoser: {type: Number},
        matches: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Match' }] //array of match objects
    }]
})

//populate() is a Mongoose method to replace IDs with the objects they represent
EventsSchema.pre('findOne', function(next) {
    this.populate('brackets.matches');
    next();
});

const Event = mongoose.model('Event', EventsSchema)

//exports allows us to use Profile anywhere in the application
module.exports = Event
module.exports = EventsSchema