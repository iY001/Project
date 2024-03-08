const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getEventById(req, res) {
    try {
        const eventId = parseInt(req.params.id);
        const event = await prisma.event.findUnique({
          where: { id: eventId },
          include: {
            teams: true,
          },
        });
        if (event) {
          res.json(event);
        } else {
          res.status(404).send('Event not found');
        }
      } catch (error) {
        console.log(error)
        res.status(500).send('Error retrieving event');
      }
    }

module.exports = getEventById