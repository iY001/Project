const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function deleteEvent(req, res) {
    try {
        const eventId = parseInt(req.params.id);
        
        await prisma.event.delete({
          where: { id: eventId },
        });
        
        res.send(`Event with ID ${eventId} deleted`);
      } catch (error) {
        res.status(500).send('Error deleting event');
      }
    }

module.exports = deleteEvent