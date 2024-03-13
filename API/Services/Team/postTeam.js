const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function postTeam(req, res) {
  try {
    const { team_name, total_score, coach_name, coach_email, coach_phone_number} = req.body;
    const newTeam = await prisma.team.create({
      data: {
        team_name,
        total_score,
        coach_name,
        coach_email,
        coach_phone_number,
      }
    });
    res.json(newTeam);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error creating team');
  }
}

module.exports = postTeam;
