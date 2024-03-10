const { PrismaClient } = require("@prisma/client");
const bcrypt = require('bcrypt');

async function putUserById(req, res) {
    try {
        const prisma = new PrismaClient();
        const userId = req.params.id;
        var { username, password } = req.body;
        
        var user = await prisma.user.findUnique({
          where: { id: userId },
        })
        password? password = password : password = user.password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const updatedUser = await prisma.user.update({
          where: { id: userId },
          data: {
            username,
            password: hashedPassword,
          },
        });
        console.log(user.password)
        res.json(updatedUser);
      } catch (error) {
        console.log(error);
        res.status(500).send('Error updating user');
      }
    }

module.exports = putUserById