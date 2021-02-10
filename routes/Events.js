const express = require("express");
const router = express.Router();
const { Event } = require("../db/models");
const { Op } = require("sequelize");

//fetches a list of fully booked events only.
// {
//   where: {
//     numOfSeats: {
//       [Op.eq]: this.bookedSeats,
//     },
//   },
// }

// Event.filter((event) => event.numOfSeats === event.bookedSeats)
router.get("/full", async (req, res) => {
  try {
    const fullbookedEvent = await Event.findAll();

    const foundbookedEvent = fullbookedEvent.filter(
      (event) => event.numOfSeats === event.bookedSeats
    );

    if (foundbookedEvent) {
      res.status(200).json(foundbookedEvent);
    } else res.status(404).json({ message: "Event does not exist" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//fetches event Detail Route
router.get("/:eventId", async (req, res) => {
  try {
    const foundevent = await Event.findByPk(req.params.eventId);
    if (foundevent) res.status(200).json(foundevent);
    else res.status(404).json({ message: "Event does not exist" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// event List Router
router.get("/", async (req, res) => {
  try {
    const event = await Event.findAll({
      order: [
        ["startDate", "ASC"],
        ["name", "ASC"],
      ],
      attributes: ["id", "name", "image", "startDate"],
      exclude: ["createdAt", "updatedAt"],
    });
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Delete event Router
router.delete("/:eventId", async (req, res) => {
  try {
    if (Array.isArray(req.body)) {
      await Event.bulkDelete(req.body);
      res.status(204).json(req.body).end();
    } else {
      //res.status(404).json({ message: "event Not Founsd" });
      const foundevent = await Event.findByPk(req.params.eventId);
      if (foundevent) {
        await foundevent.destroy();

        res.status(204).end();
      } else {
        res.status(404).json({ message: "event Not Founsd" });
      }
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Create event Router
router.post("/", async (req, res) => {
  try {
    if (Array.isArray(req.body)) {
      await Event.bulkCreate(req.body);

      res.status(201).json(req.body);
    } else {
      const newEvent = await Event.create(req.body);

      res.status(201).json(newEvent);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Update event Route
router.put("/:eventId", async (req, res) => {
  try {
    const foundevent = await Event.findByPk(req.params.eventId);
    if (foundevent) {
      await foundevent.update(req.body);
      res.status(204).end();
    } else {
      res.status(404).json({ message: "event Not Exist" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;
