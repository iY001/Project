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
      players
    } = req.body;

    // Optional: You may want to check if the team with the given ID exists before updating
    const existingTeam = await prisma.team.findUnique({
      where: { id: teamId }
    });

    if (!existingTeam) {
      return res.status(404).send('Team not found');
    }

    // Update the team's basic information
    const updatedTeam = await prisma.team.update({
      where: { id: teamId },
      data: {
        team_name,
        total_score,
        coach_name,
        coach_email,
        coach_phone_number,
      }
    });

    console.log("players", players);
    // Update the team's associated players
    if (players && players.length > 0) {
      // Define an array to store player connection promises
      const playerConnectionPromises = [];

      // Iterate over each player in the players array
      players.forEach(playerId => {
        // Connect each player to the team
        playerConnectionPromises.push(
          prisma.team.update({
            where: { id: teamId },
            data: {
              players: {
                connect: { id: playerId } // Connect each player individually
              }
            }
          })
        );
      });

      // Execute all player connection promises concurrently
      await Promise.all(playerConnectionPromises);
    }

    res.json(updatedTeam);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating team');
  }
}

module.exports = putTeamById;

