const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getAllPlayers(req, res) {
    try {
        const players = await prisma.player.findMany({
          include: {
            team: true,
          },
        });
        res.json(players);
      } catch (error) {
        console.log(error)
        res.status(500).send('Error retrieving players');
      }
    }

module.exports = getAllPlayers