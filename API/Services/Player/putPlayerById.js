const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function putPlayerById(req, res) {
    try {
        const playerId = parseInt(req.params.id);
        const { full_name, email,  age, gender, phone_number, address, city, state, country, teamId } = req.body;
        
        const updatedPlayer = await prisma.player.update({
          where: { id: playerId },
          data: { 
            full_name,
            email,
            age,
            gender,
            phone_number,
            address,
            city,
            state,
            country,
            team: {
              connect: { id: teamId },
            },
          },
          include: {
            team: true,
          },
        });
        
        res.json(updatedPlayer);
      } catch (error) {
        res.status(500).send('Error updating Player');
      }
    }

module.exports = putPlayerById