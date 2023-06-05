const express = require("express");
const app = express();
app.use(express.json());

// Array to store the rooms and bookings
let rooms = [];
let bookings = [];

// API endpoint to create a new room
app.post("/rooms", (req, res) => {
  const { roomName } = req.body;

  // Check if required field is provided
  if (!roomName) {
    return res.status(400).json({ message: "Room name is a required field." });
  }

  // Create a new room object
  const newRoom = {
    roomName,
    booked: false,
    customerName: "",
    date: "",
    startTime: "",
    endTime: "",
  };

  // Add the new room to the rooms array
  rooms.push(newRoom);

  return res.status(201).json({ message: "Room created successfully." });
});

// API endpoint to book a room
app.post("/bookings", (req, res) => {
  const { roomName, customerName, date, startTime, endTime } = req.body;

  // Check if required fields are provided
  if (!roomName || !customerName || !date || !startTime || !endTime) {
    return res
      .status(400)
      .json({
        message:
          "Room name, customer name, date, start time, and end time are required fields.",
      });
  }

  // Find the room by name
  const room = rooms.find((room) => room.roomName === roomName);

  if (!room) {
    return res.status(404).json({ message: "Room not found." });
  }

  // Check if the room is already booked
  if (room.booked) {
    return res.status(409).json({ message: "The room is already booked." });
  }

  // Update the room with booking details
  room.booked = true;
  room.customerName = customerName;
  room.date = date;
  room.startTime = startTime;
  room.endTime = endTime;

  // Add the new booking to the bookings array
  bookings.push(room);

  return res.status(201).json({ message: "Room booked successfully." });
});

// API endpoint to get all rooms with booked data
app.get("/rooms", (req, res) => {
  const roomsWithBookings = rooms.map((room) => {
    const booking = bookings.find(
      (booking) => booking.roomName === room.roomName
    );
    return {
      roomName: room.roomName,
      booked: room.booked,
      customerName: booking ? booking.customerName : "",
      date: booking ? booking.date : "",
      startTime: booking ? booking.startTime : "",
      endTime: booking ? booking.endTime : "",
    };
  });

  return res.status(200).json(roomsWithBookings);
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
