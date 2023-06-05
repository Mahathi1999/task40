const express = require("express");
const app = express();
app.use(express.json());

// Array to store the booked rooms
let bookings = [];

// API endpoint to book a room
app.post("/bookings", (req, res) => {
  const { customerName, date, startTime, endTime, roomId } = req.body;

  // Check if required fields are provided
  if (!customerName || !date || !startTime || !endTime || !roomId) {
    return res
      .status(400)
      .json({
        message:
          "Customer name, date, start time, end time, and room ID are required fields.",
      });
  }

  // Check if the room is available for booking
  const isRoomAvailable = bookings.some(
    (booking) =>
      booking.roomId === roomId &&
      booking.date === date &&
      ((booking.startTime <= startTime && startTime < booking.endTime) ||
        (booking.startTime < endTime && endTime <= booking.endTime))
  );

  if (isRoomAvailable) {
    return res
      .status(409)
      .json({
        message: "The room is already booked for the given date and time.",
      });
  }

  // Create a new booking object
  const newBooking = {
    customerName,
    date,
    startTime,
    endTime,
    roomId,
  };

  // Add the new booking to the bookings array
  bookings.push(newBooking);

  return res.status(201).json({ message: "Room booked successfully." });
});

// API endpoint to get all bookings
app.get("/bookings", (req, res) => {
  return res.status(200).json(bookings);
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
