const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function connectTeam(req, res) {
  try {
    const eventId = req.params.eventId;
    const teamId = req.params.teamId;

    const event = await prisma.event.findUnique({
      where: { id: eventId },
      include: { teams: true },
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

    const existingTeamIds = Array.isArray(event.teams)
      ? event.teams((existingTeam) => existingTeam.id)
      : [];

    // Check if the team is already connected to the event
    if (existingTeamIds.includes(teamId)) {
      return res.status(400).send('Team is already connected to the event');
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
    console.error(error);
    res.status(500).send('Error connecting event to team');
  }
}

module.exports = connectTeam;
