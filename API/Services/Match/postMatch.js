const { PrismaClient } = require('@prisma/client');

const postMatch = async (req, res) => {
  const { score1 , score2, winner, match_date, team_id, event_id } = req.body;

  try {
    const prisma = new PrismaClient();

    // Create a new match using Prisma's create method
    const newMatch = await prisma.match.create({
      data: {
        score1: score1 || 0,
        score2: score2 || 0,
        winner: winner || null,
        match_date: match_date || null,
        team: team_id ? { connect: { id: team_id } } : undefined,
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
