const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const moment = require('moment');

async function putTeamById(req, res) {
  try {
    const teamId = req.params.id; // Assuming the teamId is in the URL parameters
    const {
      team_name,
      total_score,
      coach_name,
      coach_email,
      coach_phone_number,
      home,
      away
    } = req.body;

    // Optional: You may want to check if the team with the given ID exists before updating
    const existingTeam = await prisma.team.findUnique({
      where: { id: teamId }
    });

    if (!existingTeam) {
      return res.status(404).send('Team not found');
    }

    const updatedTeam = await prisma.team.update({
      where: { id: teamId },
      data: {
        team_name,
        total_score,
        coach_name,
        coach_email,
        coach_phone_number,
        home,
        away
      },
      include: {
        logo: true,
        event: true,
        players: true
      }
    });

    res.json(updatedTeam);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error updating team');
  }
}

module.exports = putTeamById;
