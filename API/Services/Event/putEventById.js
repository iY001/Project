const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const moment = require('moment');

async function putEventById(req, res) {
  try {
    const eventId = req.params.id; // Assuming the eventId is in the URL parameters
    const {
      event_name,
      start_date,
      end_date,
      max_score,
      venue,
      organizer_name,
      organizer_email,
      organizer_phone_number
    } = req.body;

    // Optional: Check if the event with the given ID exists before updating
    const existingEvent = await prisma.event.findUnique({
      where: { id: eventId }
    });

    if (!existingEvent) {
      return res.status(404).send('Event not found');
    }

    const formattedStartDate = moment(start_date).toISOString();
    const formattedEndDate = moment(end_date).toISOString();

    const updatedEvent = await prisma.event.update({
      where: { id: eventId },
      data: {
        event_name,
        start_date: formattedStartDate,
        end_date: formattedEndDate,
        max_score,
        venue,
        organizer_name,
        organizer_email,
        organizer_phone_number
      }
    });

    res.json(updatedEvent);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error updating event');
  }
}

module.exports = putEventById;
