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

    teamData.getTeamById(req.body.id).then((teams)=>{
      if(teams[0] == null){
          //do the insert
          teamData.addNewTeam(req.body).then((msg) => {
            res.json({ message: msg });
        }).catch((err) => {
            res.json({ message: `An error occured adding Team to database: ${err}` });
        });
      }else{
        res.json({ message: `Team already exists in Database` });
      }
    }).catch((err) => {
          next(err)
      });
  })

module.exports = router