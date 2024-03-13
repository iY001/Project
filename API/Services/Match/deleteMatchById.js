const { PrismaClient } = require('@prisma/client');

const deleteMatchById = async (req, res) => {
  const matchId = req.params.id; // Assuming the match ID is provided in the URL parameters

  try {
    const prisma = new PrismaClient();

    // Check if the match exists
    const existingMatch = await prisma.match.findUnique({
      where: {
        id: matchId,
      },
    });

    if (!existingMatch) {
      return res.status(404).json({ error: 'Match not found' });
    }

    // Delete the match using Prisma's delete method
    await prisma.match.delete({
      where: {
        id: matchId,
      },
    });

    res.status(200).json({
      message: 'Match deleted successfully',
      deletedMatch: existingMatch,

    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = deleteMatchById;
