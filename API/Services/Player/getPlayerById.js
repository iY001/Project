const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getPlayerById(req, res) {
    try {
        const playerId = req.params.id;
        const student = await prisma.player.findUnique({
          where: { id: playerId },
          include: {
            team: true,
          },
        });
        if (student) {
          res.json(student);
        } else {
          res.status(404).send('Player not found');
        }
      } catch (error) {
        res.status(500).send('Error retrieving student');
      }
    }

module.exports = getPlayerById