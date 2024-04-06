const { PrismaClient } = require('@prisma/client');

const postMatch = async (req, res) => {
  try {
    const { score1, score2, winner, match_date, event_id } = req.body;

    if (!match_date) {
      return res.status(400).json({ error: 'Match date is required' });
    }
    const unformattedDate = new Date(match_date);

    const prisma = new PrismaClient();

    // Check if team_id and event_id are provided and exist in the database
    
    const event = event_id ? await prisma.event.findUnique({ where: { id: event_id } }) : null;

    if (!event && event_id) {
      return res.status(400).json({ error: 'Invalid event_id' });
    }

    // Create a new match using Prisma's create method
    const newMatch = await prisma.match.create({
      data: {
        winner: winner || null,
        match_date: unformattedDate || null,
        event: event_id ? { connect: { id: event_id } } : undefined,
      },
    });

    res.status(201).json({
      message: 'Match created successfully',
      newMatch,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = postMatch;
