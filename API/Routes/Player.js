const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const authMiddleware = require('../middleware/authMiddleware');

// Import player services
const getAllPlayers = require('../Services/Player/getAllPlayers');
const getPlayerById = require('../Services/Player/getPlayerById');
const postPlayer = require('../Services/Player/postPlayer');
const putPlayerById = require('../Services/Player/putPlayerById');
const deletePlayer = require('../Services/Player/deletePlayer');

const prisma = new PrismaClient();
router.use(authMiddleware);

router.get('/', async (req, res) => {
  getAllPlayers(req, res);
});


router.get('/:id', async (req, res) => {
  getPlayerById(req, res);
});

router.post('/', async (req, res) => {
  postPlayer(req, res);
});



router.put('/:id', async (req, res) => {
  putPlayerById(req, res);
});


router.delete('/:id', async (req, res) => {
  deletePlayer(req, res);
});


module.exports = router;