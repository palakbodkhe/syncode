const { v4: uuidv4 } = require("uuid");
const Room = require("../models/Room");

// Create a new room
const createRoom = async (req, res) => {
  try {
    const roomId = uuidv4();
    const newRoom = new Room({ roomId });
    await newRoom.save();
    res.status(201).json({ roomId });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating room", error: err.message });
  }
};

// Check if a room exists (for joining)
const getRoom = async (req, res) => {
  try {
    const room = await Room.findOne({ roomId: req.params.roomId });
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    res.status(200).json(room);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching room", error: err.message });
  }
};

module.exports = { createRoom, getRoom };
