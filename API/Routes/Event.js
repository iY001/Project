const express = require('express');
const router = express.Router();

// Import event services
const authMiddleware = require('../middleware/authMiddleware');
const getAllEvents = require('../Services/Event/getAllEvents');
const getEventById = require('../Services/Event/getEventById');
const postEvent = require('../Services/Event/postEvent');
const putEventById = require('../Services/Event/putEventById');
const deleteEvent = require('../Services/Event/deleteEvent');

router.use(authMiddleware);

router.get('/', async (req, res) => {
  getAllEvents(req, res);
});

router.get('/:id', async (req, res) => {
  getEventById(req, res);
});

router.post('/', async (req, res) => {
  postEvent(req, res);
});

router.put('/:id', async (req, res) => {
  putEventById(req, res);
});

router.delete('/:id', async (req, res) => {
  deleteEvent(req, res);
});

module.exports = router;
