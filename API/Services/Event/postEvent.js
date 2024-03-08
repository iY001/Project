const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function postEvent(req, res) {
    try {
        const { event_name, start_date, end_date, max_score, venue, organizer_name, organizer_email, organizer_phone_number, teams } = req.body;
        const currentDate = new Date();
        const isoDateString = currentDate.toISOString();
        const newEvent = await prisma.event.create({
          data: {
            event_name,
            start_date : isoDateString,
            end_date : isoDateString,
            max_score,
            venue,
            organizer_name,
            organizer_email,
            organizer_phone_number,
            teams: {
              create: teams
            }
          },
        });
        res.json(newEvent);
      } catch (error) {
        console.log(error)
        res.status(500).send('Error creating event');
      }
    }

module.exports = postEvent