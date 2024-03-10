const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getTeamById(req, res) {
    try {
        const teamId = parseInt(req.params.id);
        const team = await prisma.team.findFirst({
          where: { id: teamId },
          include: {
            events: true,
            students:true
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