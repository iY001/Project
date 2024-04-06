const { PrismaClient } = require('@prisma/client');

const connectTeam = async (req, res) => {
  try {
    const { match_id } = req.params;
    const { team_ids } = req.body;
    const prisma = new PrismaClient();

    // Check if the match exists
    const existingMatch = await prisma.match.findUnique({
      where: { id: match_id } // Include connected teams in the query
    });

    if (!existingMatch) {
      return res.status(404).json({ error: 'Match not found' });
    }

    // Check if the team is already connected to the match
    // if (existingMatch.teamAndMatches.some(tm => tm.teamId === team_id)) {
    //   return res.status(400).json({ error: 'Team already connected with match' });
    // }

    // Check if the team exists
    const existingTeam = await prisma.team.findUnique({
      where: { id: team_ids[0] || team_ids[1] },
    });

    if (!existingTeam) {
      return res.status(404).json({ error: 'Team not found' });
    }

    // Check if the team is already connected to the match
    // if (existingTeam.teamAndMatches.some(tm => tm.matchId === match_id)) {
    //   return res.status(400).json({ error: 'Team already connected with match' });
    // }
    // Connect the team with the match
    await prisma.teamAndMatches.create({
      data: {
        match: { connect: { id: match_id } },
        team1: { connect: { id: team_ids[0] } },
        team2: { connect: { id: team_ids[1] } },
      },
    });

  // await prisma.teamAndMatches.update({
  //   where: {
  //     match_id : match_id
  //   },
  //   data: {
  //     team_id : [team_id_1 , team_id_2]
  //   }
  // })


    res.status(200).json({ message: 'Match connected with Team successfully' })
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = connectTeam;
