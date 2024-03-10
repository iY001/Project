const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function putPlayerById(req, res) {
  try {
    const playerId = req.params.id;
    const { name, score, email, age, gender, phone_number, address, city, state, country, team_id } = req.body;

    const updatedPlayer = await prisma.player.update({
      where: { id: playerId },
      data: {
        name,
        email,
        score,
        age,
        gender,
        phone_number,
        address,
        city,
        state,
        country,
        team: {
          connect: { id: team_id } // Corrected variable name to match the one used in the request body
        },
      },
      include: {
        team: true,
      },
    });

    res.json(updatedPlayer);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error updating Player');
  }
}

module.exports = putPlayerById;
