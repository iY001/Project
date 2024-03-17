const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function postPlayer(req, res) {
    try {
        const { name, score , email, age, gender, phone_number, address, city, state, country, team_id } = req.body;
      
        // Check if the team with the specified team_id exists
        const existingTeam = await prisma.team.findFirst({
          where: {
            id: team_id,
          },
        });
    
        if (!existingTeam) {
          return res.status(404).json({ message: 'Team not found' });
        }
        //check if the player exists
        const existingPlayer = await prisma.player.findFirst({
          where: {
            name: name,
          },
        });
        const teamPlayerExists = await prisma.team.findMany({
          where: {
            id: team_id,
            players: {
              some: {
                name: name
              }
            }
          }
        })
        if (existingPlayer || teamPlayerExists.length > 0) {
          return res.status(400).json({ message: 'Player already exists' });
        }
        // Team exists, proceed to create the new player
        const newPlayer = await prisma.player.create({
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
              connect: { id: team_id },
            },
          },
          include: {
            team: true,
          },
        });
    
        res.json(newPlayer);
      } catch (error) {
        console.log(error);
        res.status(500).send('Error creating player');
      }
    }

module.exports = postPlayer