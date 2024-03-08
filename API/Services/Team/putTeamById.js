const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function putTeamById(req, res) {
    try {
        const teamId = parseInt(req.params.id);
        const { team_name, total_score, coach_name, coach_email, coach_phone_number, eventId } = req.body;
        
        const updatedTeam = await prisma.team.update({
          where: { id: teamId },
          data: { 
            team_name,
            total_score,
            coach_name,
            coach_email,
            coach_phone_number,
          },
          include: {
            events: true,
            students:true
          },
        });
        
        res.json(updatedTeam);
      } catch (error) {
        console.log(error)
        res.status(500).send('Error updating team');
      }
    }

module.exports = putTeamById