const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

// Import team services
const authMiddleware = require('../middleware/authMiddleware');
const getAllTeams = require('../Services/Team/getAllTeams');
const getTeamById = require('../Services/Team/getTeamById');
const postTeam = require('../Services/Team/postTeam');
const putTeamById = require('../Services/Team/putTeamById');
const deleteTeamById = require('../Services/Team/deleteTeamById');
const connectTeam = require('../Services/Team/connectTeam');
const removePlayer = require('../Services/Team/removePlayer');

const prisma = new PrismaClient();
router.use(authMiddleware);

router.get('/', async (req, res) => {
  getAllTeams(req, res);
});

router.get('/:id', async (req, res) => {
  getTeamById(req, res);
});

router.post('/', async (req, res) => {
  postTeam(req, res);
});

router.put('/:id', async (req, res) => {
  putTeamById(req, res);
});


router.post('/:eventId/connectTeam/:teamId', async (req, res) => {
  connectTeam(req, res);
});

router.delete('/:id', async (req, res) => {
  deleteTeamById(req, res);
});

router.put('/:teamId/removeplayer/:playerId', async (req, res) => {
  removePlayer(req, res);
});

module.exports = router;
