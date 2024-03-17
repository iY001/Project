const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function postTeam(req, res) {
  try {
    const { team_name, total_score, coach_name, coach_email, coach_phone_number , players} = req.body;
    // check if the team already exists
    const existingTeam = await prisma.team.findFirst({
      where: {
        team_name
      }
    });
    if (existingTeam) {
      return res.status(400).send({
        error: 'Team already exists'
      });
    }
    const newTeam = await prisma.team.create({
      data: {
        team_name,
        total_score,
        coach_name,
        coach_email,
        coach_phone_number,
        players: {
          
          connect: players.map((player) => ({
            id: player,
          }))
        }
      }
    });
    res.json({
      message: 'Team created successfully',
      team: newTeam
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: 'An error occurred while creating the team'
    });
  }
}

module.exports = postTeam;
