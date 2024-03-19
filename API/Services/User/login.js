const { PrismaClient } = require('@prisma/client');



async function login(req, res) {
  try {
    const bcrypt = require('bcrypt');
    const jwt = require('jsonwebtoken');
    const prisma = new PrismaClient();
    const { email, password } = req.body;
    const user = await prisma.user.findFirst({
      where: { email },
    });

    if (!user) {
      return res.send({
        error: 'Not found'
      });
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res.json({
        error: 'Invalid username or password'
      });
    }

    const token = jwt.sign({ id: user.id }, 'secret');
    res.send({ token, "id": user.id, user: user });
  } catch (error) {
    res.status(500).send({
      error: 'An error occurred while logging in',
      message: error.message,
    });
  }
}

module.exports = login