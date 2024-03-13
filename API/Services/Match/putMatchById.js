const { PrismaClient } = require('@prisma/client');

const putMatchById = async (req, res) => {
  const matchId = req.params.id; // Assuming the match ID is provided in the URL parameters
  const { score, winner, match_date, team_id, event_id } = req.body;

  try {
    const prisma = new PrismaClient();

    // Check if the match exists
    const existingMatch = await prisma.match.findFirst({
      where: {
        id: matchId,
      },
    });

    if (!existingMatch) {
      return res.status(404).json({ error: 'Match not found' });
    }

    // Update the match using Prisma's update method
    const updatedMatch = await prisma.match.update({
      where: {
        id: matchId,
      },
      data: {
        score: score !== undefined ? score : existingMatch.score,
        winner: winner !== undefined ? winner : existingMatch.winner,
        match_date: match_date !== undefined ? match_date : existingMatch.match_date,
        team: team_id ? { connect: { id: team_id } } : undefined,
        event: event_id ? { connect: { id: event_id } } : undefined,
      },
    });

    res.status(200).json({
      message: 'Match updated successfully',
      updatedMatch,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = putMatchById;
