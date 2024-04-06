const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function postTeam(req, res) {
  try {
    const { team_name, total_score, coach_name, coach_email, coach_phone_number } = req.body;


    // Check if the required fields are provided
    if (!team_name || !coach_name || !coach_email || !coach_phone_number) {
      return res.status(400).send({ error: 'Please provide all required fields' });
    }

    // Check if the team already exists
    const existingTeam = await prisma.team.findFirst({
      where: { team_name }
    });

    if (existingTeam) {
      return res.status(400).send({ error: 'Team already exists' });
    }

    // Create the new team
    const newTeam = await prisma.team.create({
      data: {
        team_name,
        total_score,
        coach_name,
        coach_email,
        coach_phone_number,
      }
    });

    res.status(201).json({
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
