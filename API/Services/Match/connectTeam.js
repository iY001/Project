const { PrismaClient } = require('@prisma/client');

const connectTeam = async (req, res) => {
  const { match_id , team_id } = req.params
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
    const existingTeam = await prisma.team.findUnique({
      where: {
        id: team_id,
      },
    });

    if (!existingTeam) {
      return res.status(404).json({ error: 'Team not found' });
    }

    // Update the match to connect with the specified team
    const updatedTeam = await prisma.team.update({
      where: {
        id: team_id,
      },
      data: {
        matches: {
          connect: {
            id: match_id, // Connect the new match
          }
        },
      },
    });
    

    // Fetch all matches after updating the match
    const teams = await prisma.team.findMany();

    res.status(200).json({
      message: 'Match connected with Team successfully',
      updatedTeam,
      teams,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = connectTeam;
