const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const profileSchema = require("./Schemas/UserSchema");


module.exports = function(connectionString) {
    let Profile;

    return {
        // Initialize the connection to our MongoDB Database
        initialize: function() {
            console.log("Initializing connection to User Data database...");
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
                    Profile = db.model("User", profileSchema);
                    console.log("Profile Initialized");
                    resolve();
                });
            });
        },
        // Add new user to the database
        addNewUser: function(user) {
            return new Promise((resolve, reject) => {
                console.log("adding new User:");
                bcrypt.hash(user.password, 10).then(hash => {  //myPassword123 ?? 
                    user.password = hash;
                    let newUser = new Profile(user);
                    console.log(newUser);
                    newUser.save(err => {
                        if (err) {
                            reject(`Error Saving user in database: ${err}`);
                        } else {
                            resolve(`New user added to database: ${user}`);
                        }
                    });
                }).catch(err => {
                    reject(`Error salting and hashing password: ${err}`);
                });
            });
        },
        // Get user in database by Username
        getUserByUsername: function(data) {
            return new Promise((resolve, reject) => {
                console.log(`Finding user by username: ${data}`);
                Profile.findOne({ username: data }).exec().then(user => {
                    resolve(user);
                }).catch(err => {
                    reject(err);
                });
            });
        },
        // Get user in database by Email
        getUserByEmail: function(data) {
            return new Promise((resolve, reject) => {
                console.log(`Finding user by email: ${data}`);
                Profile.findOne({ email: data }).exec().then(user => {
                    resolve(user);
                }).catch(err => {
                    reject(err);
                });
            });
        }
    }
}