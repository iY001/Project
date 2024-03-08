const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = new PrismaClient();

async function login(req, res) {
    try {
        const { email, password } = req.body;
        const user = await prisma.user.findFirst({
          where: { email },
        });
    
        if (!user) {
          return res.status(401).send('Invalid username or password');
        }
    
        const isValid = await bcrypt.compare(password, user.password);
    
        if (!isValid) {
          return res.status(401).send('Invalid username or password');
        }
    
        const token = jwt.sign({ id: user.id }, 'secret');
        res.send({ token , "id":user.id });
      } catch (error) {
        res.status(500).send('Error logging in');
      }
}

module.exports = login