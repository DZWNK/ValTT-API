const express = require('express')
const router = express.Router()
const createError = require('http-errors')

const Match = require('../Modules/Schemas/MatchSchema')

router.get('/matches', (req, res, next) => {
    matchData.getMatchesById(req.body.ids).then((matches) => {
        if (matches[0] != null) {
            res.json(matches)
        } else {
            res.json({ message: `No matches found for provided id ${req.body.ids} available`});
        }
    }).catch((err) => {
        next(err)
    });
})

router.get('/match', (req, res, next) => {
    matchData.getMatchById(req.body.id).then((match) => {
        if (match[0] != null) {
            res.json(match[0])
        } else {
            res.json({ message: `No Match found with id ${req.body.id} available`});
        }
    }).catch((err) => {
        next(err)
    });
})

module.exports = router