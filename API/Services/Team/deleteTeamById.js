const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function deleteTeamById(req, res) {
  try {
    const teamId = req.params.id; // Assuming the teamId is in the URL parameters

    // Optional: Check if the team with the given ID exists before deleting
    const existingTeam = await prisma.team.findUnique({
      where: { id: teamId }
    });

    if (!existingTeam) {
      return res.status(404).send({
        message : `Team Not Found`
      });
    }
    await prisma.teamAndMatches.deleteMany({
      where: {
        OR: [
          { team1: { id: teamId } },
          { team2: { id: teamId } }
        ]
      },
    });
    // Delete the team
    await prisma.team.delete({
      where: { id: existingTeam.id }
    });

    res.status(204).send({
      message : `Team ${teamId} Deleted Successfully`,
      data : existingTeam
    }); // Send a 204 No Content response upon successful deletion
  } catch (error) {
    console.log(error);
    res.status(500).send('Error deleting team');
  }
}

module.exports = deleteTeamById;
