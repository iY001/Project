const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const moment = require('moment');

async function postEvent(req, res) {
  try {
    const {
      event_name,
      start_date,
      end_date,
      max_score,
      venue,
      organizer_name,
      organizer_email,
      organizer_phone_number,
      team_id
    } = req.body;

    const formattedStartDate = moment(start_date).toISOString();
    const formattedEndDate = moment(end_date).toISOString();

    const newEvent = await prisma.event.create({
      data: {
        event_name,
        start_date: formattedStartDate,
        end_date: formattedEndDate,
        max_score,
        venue,
        organizer_name,
        organizer_email,
        organizer_phone_number,
        teams: {
          connect: { id: team_id }
        }
      }
    });

    res.json(newEvent);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error creating event');
  }
}

module.exports = postEvent;
