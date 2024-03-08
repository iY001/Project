const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleware/authMiddleware');
// Import user services
const register = require('../Services/User/register');
const login = require('../Services/User/login');
const getAllUsers = require('../Services/User/getAllUsers');
const getUserById = require('../Services/User/getUserById');
const putUserById = require('../Services/User/putUserById');
const deleteUserById = require('../Services/User/deleteUserById');

const prisma = new PrismaClient();

// Create a new user
router.post('/register', async (req, res) => {
  register(req, res);
});

// Login
router.post('/login', async (req, res) => {
  login(req, res);
});

// Retrieve all users
router.get('/',authMiddleware, async (req, res) => {
  getAllUsers(req, res);
});

// Retrieve a specific user by ID
router.get('/:id', async (req, res) => {
  getUserById(req, res);
}); 

// Update an existing user
router.put('/:id', async (req, res) => {
  putUserById(req, res);
});

// Delete a user
router.delete('/:id', async (req, res) => {
  deleteUserById(req, res);
});

module.exports = router;