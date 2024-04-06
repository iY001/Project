// const { PrismaClient } = require("@prisma/client");

// async function connectTeam(req, res) {
//   try {
//     const prisma = new PrismaClient();
//     const playerId = req.params.playerId;
//     const teamId = req.params.teamId;

//     const team = await prisma.team.findFirst({
//       where: { id: teamId },
//       include: { players: true },
//     });

//     const player = await prisma.player.findFirst({
//       where: { id: playerId },
//     });

//     if (!player) {
//       return res.status(404).send('Player not found');
//     }

//     if (!team) {
//       return res.status(404).send('Team not found');
//     }

//     if (team.players.some((p) => p.id === playerId)) {
//       return res.status(400).send('Player already connected to team');
//     }

//     await prisma.team.update({
//       where: { id: teamId },
//       data: {
//         players: {
//           connect: { id: playerId },
//         },
//       },
//     });
//     console.log(team);
//     res.send('Player connected to team successfully');
//   } catch (error) {
//     console.log(error);
//     res.status(500).send('Error connecting player to team');
//   }
// }

// module.exports = connectTeam;
