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
    } = req.body;

    if (start_date > end_date) {
      return res.status(400).send({ error: 'Start date must be before end date' });
    }

    const exsitsEvent = await prisma.event.findFirst({
      where: {
        event_name
      }
    })

    if (exsitsEvent) {
      return res.status(400).send({ error: 'Event already exists' });
    }
    const formattedStartDate = moment(start_date).toISOString();
    const formattedEndDate = moment(end_date).toISOString();

    const newEvent = await prisma.event.create({
      data: {
        event_name,
        start_date: formattedStartDate,
        end_date: formattedEndDate,
        max_score : parseInt(max_score),
        venue,
        organizer_name,
        organizer_email,
        organizer_phone_number
      }
    });

    res.status(201).json({
      message: 'Event created successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: 'Error creating event' });
  }
}

module.exports = postEvent;
