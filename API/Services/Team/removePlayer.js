const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function removePlayer(req, res) {
    try {
        const teamId = req.params.teamId; // Assuming the teamId is in the URL parameters
        const playerId = req.params.playerId; // Assuming the playerId is in the URL parameters
        // Optional: Check if the team with the given ID exists before updating
        const existingTeam = await prisma.team.findFirst({
            where: { id: teamId }
        });
        const selectedPlayer = await prisma.player.findFirst({
            where: { id: playerId }
        });

        if (!existingTeam) {
            return res.status(404).send('Team not found');
        }
        if (!selectedPlayer) {
            return res.status(404).send('Player not found');
        }

        // Update the team to remove the player
        await prisma.team.update({
            where: { id: teamId },
            data: {
                players: {
                    disconnect: {
                        id: playerId
                    }
                }
            }
        });

        await prisma.player.update({
            where: {
              id: playerId
            },
            data: {
              team: {
                disconnect: true
              }
            }
          });
          

        res.status(204).send(`Player ${playerId} Removed From Team ${teamId} Successfully`); // Send a 204 No Content response upon successful update
    } catch (error) {
        console.log(error);
        res.status(500).send('Error removing player from team');
    }
}

module.exports = removePlayer;
