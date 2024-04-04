const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function login(req, res) {
  try {
    const prisma = new PrismaClient();
    const { email, password } = req.body;
    const user = await prisma.user.findFirst({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({
        error: 'User not found'
      });
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res.status(401).json({
        error: 'Invalid username or password'
      });
    }

    const token = jwt.sign({ id: user.id }, 'secret');
    res.status(200).json({ token, id: user.id, user });
  } catch (error) {
    console.error('Error while logging in:', error);
    res.status(500).json({
      error: 'An error occurred while logging in',
      message: error.message,
    });
  }
}

module.exports = login;
