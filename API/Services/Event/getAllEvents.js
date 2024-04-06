const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getAllEvents(req, res) {
  try {
    const events = await prisma.event.findMany({
      include: {
        matches: true
      },
      orderBy: {
        created_at: 'desc', // Optionally, you can order events by created_at in descending order
      },
    });
    res.json(events);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error retrieving events');
  }
}

module.exports = getAllEvents;
