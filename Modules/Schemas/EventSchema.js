const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EventsSchema = new Schema({
    runningStatus: {type: Boolean},
    dateCreated: {type: Date, default: Date.now},
    startDate: {type: Date},
    endDate: {type: Date},
    watchLink: {type: String}, //clickable link
    verified: {type: Boolean},
    featured: {type: Boolean},
    winner: {type: Number},
    teams: [{ //Team Preview
        id: {type: String}, //needs to be a reference to team object Id
        name: {type: String},
        activeStatus: {type: Boolean}
    }],
    brackets: [{
        BracketName: {type: String},
        PushPerMatch: {type: Boolean},
        PushWinner: {type: Number},
        PushLoser: {type: Number},
        matches: [{  
            match: { //Match Preview
                id: {type: String},
                teams: [{ //Team preview
                    id: {type: String}, //needs to be a reference to team object Id
                    name: {type: String},
                    activeStatus: {type: Boolean}
                }],
                score: {type: String},
                winner: {type: String},
                loser: {type: String},
                activeStatus: {type: Boolean},
                timePlayed: {type: Date, default: Date.now},
                winsNeeded: {type: Number}
             }
        }]
    }]
})

//populate() is a Mongoose method to replace IDs with the objects they represent
EventsSchema.pre('findOne', function(next) {
    //this.populate('brackets.matches.match').populate('teams.id').populate('brackets.matches.match.id');
    next();
});

const Event = mongoose.model('Event', EventsSchema)

//exports allows us to use Profile anywhere in the application
module.exports = Event
module.exports = EventsSchema


/*
class EventPreview{
	id: string;
    name: string;
    runningStatus: boolean;
	startDate: Date;
	endDate: Date;
}
class Event{
	id: string;
	runningStatus: boolean;
	dateCreated: Date;
	startDate: Date;
	endDate: Date;
	watchLink: string;
	verified: boolean;
	featured: boolean;
	winner: number;
	teams: [TeamPreview];
	brackets: [{
		name: string;
		pushPerMatch: boolean;
		pushWinner: boolean;
		pushLoser: number;
		matchesPlayed: number;
		matches: [{
			match: MatchPreview; 
			prize: string;
		}];
	}
}*/

//matches: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Match' }] //array of match objects

/* 
class MatchPreview{
	id: string;
	teams: [TeamPreview]; // Embed object do NOT reference to object
	score: [number];
	winner: number;
	loser: number;
	activeStatus: boolean;
	timePlayed: Date;
	winsNeeded: number;
}
*/