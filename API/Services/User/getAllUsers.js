const { PrismaClient } = require("@prisma/client");


async function getAllUsers(req, res) {
    try {
        const prisma = new PrismaClient();
        const users = await prisma.user.findMany();
        res.json(users);
      } catch (error) {
        console.log(error);
        res.status(500).send('Error retrieving users');
      }
    }

module.exports = getAllUsers