const express = require("express");
const router = express.Router();
const { Event } = require("../db/models");

//Home
router.get("/", async (req, res) => {
  console.log("HELLO");
  res.json({ message: "Event" });
});

// event List Router
router.get("/", async (req, res) => {
  try {
    const event = await Event.findAll();
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Delete event Router
router.delete("/:eventId", async (req, res) => {
  try {
    const foundevent = await Event.findByPk(req.params.eventId);
    if (foundevent) {
      await foundevent.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ message: "event Not Founsd" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Create event Router
router.post("/", async (req, res) => {
  try {
    const newEvent = await Event.create(req.body);
    res.status(201).json(newEvent);
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
