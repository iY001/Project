const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

async function register(req, res) {
  try {
    const { username, email, password } = req.body;

    // Validate username, email, and password
    if (!username || !email || !password) {
      return res.status(400).send('Username, email, and password are required');
    }

    // Additional validation logic can be added here

    const existingUser = await prisma.user.findFirst({
      where: { OR: [{ username }, { email }] },
    });

    if (existingUser) {
      return res.status(400).json({
        error: 'Username or email already exists',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    const token = jwt.sign({ id: newUser.id }, 'secret');
    res.status(201).json({ token });
  } catch (error) {
    console.error('Error while registering:', error);
    res.status(500).json({
      error: 'An error occurred while registering',
    });
  }
}

module.exports = register;
