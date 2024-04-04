const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

// Import match services
const authMiddleware = require('../middleware/authMiddleware');
const getAllMatches = require('../Services/Match/getAllMatches');
const getMatchById = require('../Services/Match/getMatchById');
const postMatch = require('../Services/Match/postMatch');
const putMatchById = require('../Services/Match/putMatchById');
const deleteMatchById = require('../Services/Match/deleteMatchById');
const connectEvent = require('../Services/Match/connectEvent');
const connectTeam = require('../Services/Match/connectTeam');


const prisma = new PrismaClient();
router.use(authMiddleware);

router.get('/', async (req, res) => {
    getAllMatches(req, res);
});

router.get('/:id', async (req, res) => {
    getMatchById(req, res);
});

router.post('/', async (req, res) => {
    postMatch(req, res);
});

router.put('/:id', async (req, res) => {
    putMatchById(req, res);
});

router.delete('/:id', async (req, res) => {
    deleteMatchById(req, res);
});

router.post('/:match_id/connectevent/:event_id', async (req, res) => {
    connectEvent(req, res);
})
router.post('/:match_id/connectteam/:team_id', async (req, res) => {
    connectTeam(req, res);
})
router.post('/:match_id/connectmatch/:team_id/:event_id', async (req, res) => {
    connectTeam(req, res);
})
module.exports = router