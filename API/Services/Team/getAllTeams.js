const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getAllTeams(req, res) {
  try {
    const teams = await prisma.team.findMany({
      include: {
        players: true,
        Team1AndMatches: true,
      },
    });
    res.json(teams);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error retrieving teams');
  }
}

module.exports = getAllTeams