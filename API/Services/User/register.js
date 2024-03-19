const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = new PrismaClient();

async function register(req, res) {
    try {
        const { username, email , password } = req.body;
    
        // Validate username and password
        if (!username || !password) {
          return res.status(400).send('Username and password are required');
        }
    
        // Additional validation logic can be added here
    
        const existingUser = await prisma.user.findFirst({
          where: { username },
        });
    
        if (existingUser) {
          return res.status(400).send({
            error: 'Username already exists',
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
        res.json({ token });
      } catch (error) {
        console.log(error)
        res.status(500).send({
          error: 'An error occurred while registering',
        });
      }
}

module.exports = register