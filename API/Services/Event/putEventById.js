const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function putEventById(req, res) {
    try {
        const eventId = parseInt(req.params.id);
        const { event_name, start_date, end_date, max_score, venue, organizer_name, organizer_email, organizer_phone_number } = req.body;
        
        const updatedEvent = await prisma.event.update({
          where: { id: eventId },
          data: { 
            event_name,
            start_date,
            end_date,
            max_score,
            venue,
            organizer_name,
            organizer_email,
            organizer_phone_number 
          },
        });
        
        res.json(updatedEvent);
      } catch (error) {
        res.status(500).send('Error updating event');
      }
    }

module.exports = putEventById