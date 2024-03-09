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
router.post('/register', register);

// Login
router.post('/login', login);

// Retrieve all users
router.get('/', authMiddleware, getAllUsers);

// Retrieve a specific user by ID
router.get('/:id', getUserById);

// Update an existing user
router.put('/:id', putUserById);

// Delete a user
router.delete('/:id', deleteUserById);

module.exports = router;