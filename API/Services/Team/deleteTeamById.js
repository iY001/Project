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
      return res.status(404).send('Team not found');
    }

    // Delete the team
    await prisma.team.delete({
      where: { id: teamId }
    });

    res.status(204).send(`Team ${teamId} Deleted Successfully`); // Send a 204 No Content response upon successful deletion
  } catch (error) {
    console.log(error);
    res.status(500).send('Error deleting team');
  }
}

module.exports = deleteTeamById;
