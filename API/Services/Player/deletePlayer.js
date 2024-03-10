const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function deletePlayer(req, res) {
  try {
    const playerId = req.params.id;

    await prisma.player.delete({
      where: { id: playerId },
    });

    res.send(`Player with ID ${playerId} deleted`);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error deleting player');
  }
}

module.exports = deletePlayer