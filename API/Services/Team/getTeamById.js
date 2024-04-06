const { PrismaClient } = require("@prisma/client");

async function getTeamById(req, res) {
  try {
    const prisma = new PrismaClient();
    const teamId = req.params.id;
    const team = await prisma.team.findFirst({
      where: { id: teamId },
      include: {
        players: true
      },
    });
    if (team) {
      res.json(team);
    } else {
      res.status(404).send('Team not found');
    }
  } catch (error) {
    res.status(500).send('Error retrieving team');
  }
}

module.exports = getTeamById