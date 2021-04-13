const express = require('express')
const router = express.Router()
const createError = require('http-errors')

const Player = require('../Modules/Schemas/PlayerSchema')

router.get('/player', (req, res, next) => {
    playerData.getPlayerById(req.query.id).then((player) => {
        console.log(req.body.id);
        if (player[0] != null) {
            res.json(player[0])
        } else {
            res.json({ message: `No player found with id ${req.body.id} available`});
        }
    }).catch((err) => {
        next(err)
    });
})

router.post('/newPlayer', async(req, res, next) =>{
    playerData.createPlayer(req.body).then((msg) => {
       res.json({ message: msg });
   }).catch((err) => {
       res.json({ message: `An error occured adding Player to database: ${err}` });
   });

})

module.exports = router