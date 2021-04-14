const express = require('express')
const router = express.Router()
const createError = require('http-errors')

const Team = require('../Modules/Schemas/TeamSchema')

//get all teams
router.get('/teams', (req, res, next) =>{
    teamData.getAllTeams().then(teams => {
        console.log("Teams "+teams)
        if (teams != null) {
            res.json(teams)
        }
        else {
            res.json({ message: `Cannot Find Teams` });
        }
    }).catch((err) => {
        next(err)
    });
})

//get Team by team name
router.get('/team', (req, res, next) => {
    teamData.getTeamByName(req.query.teamName).then(team => {
        if (team != null) {
            res.json(team)
        }
        else {
            res.json({ message: `Cannot Find Team with name ${req.query.teamName}` });
        }
    }).catch((err) => {
        next(err)
    });
})

router.get('/teambyId', (req, res, next) => {
    teamData.getTeamById(req.query.id).then(team => {
        if (team != null) {
            res.json(team)
        }
        else {
            res.json({ message: `Cannot Find Team with id ${req.query.id}` });
        }
    }).catch((err) => {
        next(err)
    });
})

router.get('/verified', (req, res, next) => {
    teamData.getVerifiedTeams().then(teams => {
        if (teams[0] != null) {
            res.json(teams)
        }
        else {
            res.json({ message: `No verified Teams available` });
        }
    }).catch((err) => {
        next(err)
    });
})

router.post('/newTeam', async(req, res, next) =>{
         teamData.addNewTeam(req.body).then((msg) => {
            res.json({ message: msg });
        }).catch((err) => {
            res.json({ message: `An error occured adding Event to database: ${err}` });
        });
  
  })

module.exports = router