const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function connectTeam(req, res) {
    try {
        const eventId = parseInt(req.params.eventId);
        const teamId = parseInt(req.params.teamId);
    
        const event = await prisma.event.findUnique({
          where: { id: eventId },
        });
    
        if (!event) {
          return res.status(404).send('Event not found');
        }
    
        const team = await prisma.team.findUnique({
          where: { id: teamId },
        });
    
        if (!team) {
          return res.status(404).send('Team not found');
        }
    
        await prisma.event.update({
          where: { id: eventId },
          data: {
            teams: {
              connect: { id: teamId },
            },
          },
        });
    
        res.send('Event connected to team successfully');
      } catch (error) {
        res.status(500).send('Error connecting event to team');
      }
    }

module.exports = connectTeam