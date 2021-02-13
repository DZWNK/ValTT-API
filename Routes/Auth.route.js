const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const createError = require('http-errors');
const User = require('../Modules/Schemas/UserSchema');

const userService = require("../Modules/UserService");


router.post('/signup', (req, res) => {
    userData.getUserByEmail(req.body.email).then((user) => {
        if (user == null) {
            userData.getUserByUsername(req.body.username.toLowerCase()).then((user) => {
                if (user == null) {
                    userData.addNewUser(req.body).then((msg) => {
                        res.json({ message: msg });
                    }).catch((err) => {
                        res.json({ message: `An error occured adding User to database: ${err}` });
                    });
                } else {
                    res.json({ message: 'Username already taken' });
                }
            }).catch((err) => {
                console.log(`An error occured finding User by Username: ${err}`);
            });
        } else {
            res.json({ message: 'Email already registered' });
        }
    }).catch((err) => {
        console.log(`An error occured finding User by Email: ${err}`);
    });
});

router.post('/login', (req, res) => {
    console.log('Logging in user:');
    // Regex check if email syntax
    let isEmail = /.*@.*/.test(req.body.login);
    if (isEmail) {
        // Searching user by Email
        userData.getUserByEmail(req.body.login).then(user => {
            if (user != null) {
                console.log("Req pwd "+req.body.password)
                console.log("Req pwd "+user.email)
                verifyPassword(req.body.password, user.password).then(result => {
                    if (result) {
                        res.json({ message: 'Authentification Succeeded' });
                        // JWT
                    } else {
                        res.json({ message: 'Authentification Failed' });
                    }
                }).catch(err => {
                    console.log(`An error occured checking passwords: ${err}`);
                });
            } else {
                res.json({ message: 'Authentification Failed' });
            }
        }).catch(err => {
            console.log(`An error occured finding User by Email: ${err}`);
        });
    } else {
        // Searching user by Username
        userData.getUserByUsername(req.body.login).then(user => {
            if (user != null) {
                verifyPassword(req.body.password, user.password).then(result => { //Lowercase removed
                    if (result) {
                        res.json({ message: 'Authentification Succeeded' });
                        // JWT
                    } else {
                        res.json({ message: 'Authentification Failed' });
                    }
                }).catch(err => {
                    console.log(`An error occured checking passwords: ${err}`);
                });
            } else {
                res.json({ message: 'Authentification Failed' });
            }
        }).catch(err => {
            console.log(`An error occured finding User by Username: ${err}`);
        });
    }
});

function verifyPassword(password, hash) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hash).then((result) => {
            resolve(result);
        }).catch(err => {
            reject(err);
        });
    });
}

//allows us to use router anywhere in the app
module.exports = router