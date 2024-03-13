const { PrismaClient } = require('@prisma/client');

const connectMatch = async (req, res) => {
  const { match_id , event_id } = req.params
  try {
    const prisma = new PrismaClient();

    // Check if the match exists
    const existingMatch = await prisma.match.findUnique({
      where: {
        id: match_id,
      },
    });

    if (!existingMatch) {
      return res.status(404).json({ error: 'Match not found' });
    }

    // Check if the event exists
    const existingEvent = await prisma.event.findUnique({
      where: {
        id: event_id,
      },
    });

    if (!existingEvent) {
      return res.status(404).json({ error: 'Event not found' });
    }

    // Update the match to connect with the specified event
    const updatedMatch = await prisma.match.update({
      where: {
        id: match_id,
      },
      data: {
        event: {
          connect: {
            id: event_id,
          },
        },
      },
    });

    // Fetch all matches after updating the match
    const matches = await prisma.match.findMany();

    res.status(200).json({
      message: 'Match connected with Event successfully',
      updatedMatch,
      matches,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = connectMatch;
