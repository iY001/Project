const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getUserById(req, res) {
    try {
        const userId = parseInt(req.params.id);
        const user = await prisma.user.findUnique({
          where: { id: userId },
        });
        
        if (!user) {
          return res.status(404).send('User not found');
        }
    
        res.json(user);
      } catch (error) {
        res.status(500).send('Error retrieving user');
      }
    }

module.exports = getUserById