const { PrismaClient } = require('@prisma/client');

const connectEvent = async (req, res) => {
    try {
    const { match_id, event_id , team_id } = req.params
    const prisma = new PrismaClient();

    // Fetch the existing event
const existingEvent = await prisma.event.findUnique({
    where: {
      id: event_id,
    },
    select: {
      match_ids: true,
    },
  });


  // Extract existing match IDs
  const existingMatchIds = existingEvent.match_ids || [];
  
  // Add the new match ID to the existing IDs
  existingMatchIds.push(match_id);
  
  // Update the event with the updated matches array

  if(existingEvent.match_ids != match_id) {
      const updatedEvent = await prisma.event.update({
          where: {
              id: event_id,
            },
            data: {
                matches: {
                    connect: existingMatchIds.map(id => ({ id })),
                },
            },
        });   
    }
  // Similarly, update the team with the updated matches array
  const updatedTeam = await prisma.team.update({
    where: {
      id: team_id,
    },
    data: {
      matches: {
        connect: existingMatchIds.map(id => ({ id })),
      },
    },
  });

  
    res.status(200).json({
      message: 'Match connected with Event successfully',
      updatedEvent,
      events,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = connectEvent;
