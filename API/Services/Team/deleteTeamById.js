const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function deleteTeamById(req, res) {
    try {
        const teamId = parseInt(req.params.id);
        
        await prisma.team.delete({
          where: { id: teamId },
        });
        
        res.send(`Team with ID ${teamId} deleted`);
      } catch (error) {
        res.status(500).send('Error deleting team');
      }
    }

module.exports = deleteTeamById