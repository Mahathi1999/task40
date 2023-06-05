const express = require("express");
const app = express();
app.use(express.json());

// Array to store the bookings
let bookings = [];
let bookingIdCounter = 1;

// API endpoint to book a room
app.post("/bookings", (req, res) => {
  const { customerName, roomName, date, startTime, endTime } = req.body;

  // Check if required fields are provided
  if (!customerName || !roomName || !date || !startTime || !endTime) {
    return res
      .status(400)
      .json({
        message:
          "Customer name, room name, date, start time, and end time are required fields.",
      });
  }

  // Create a new booking object
  const newBooking = {
    bookingId: bookingIdCounter,
    customerName,
    roomName,
    date,
    startTime,
    endTime,
    bookingDate: new Date().toISOString(),
    bookingStatus: "Booked",
  };

  // Increment the booking ID counter
  bookingIdCounter++;

  // Add the new booking to the bookings array
  bookings.push(newBooking);

  return res.status(201).json({ message: "Room booked successfully." });
});

// API endpoint to get all bookings with customer booking count
app.get("/bookings", (req, res) => {
  const customerBookings = {};

  // Count the number of bookings for each customer
  bookings.forEach((booking) => {
    if (!customerBookings[booking.customerName]) {
      customerBookings[booking.customerName] = 1;
    } else {
      customerBookings[booking.customerName]++;
    }
  });

  const bookingsWithCustomerCount = bookings.map((booking) => {
    return {
      customerName: booking.customerName,
      roomName: booking.roomName,
      date: booking.date,
      startTime: booking.startTime,
      endTime: booking.endTime,
      bookingId: booking.bookingId,
      bookingDate: booking.bookingDate,
      bookingStatus: booking.bookingStatus,
      bookingCount: customerBookings[booking.customerName],
    };
  });

  return res.status(200).json(bookingsWithCustomerCount);
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
