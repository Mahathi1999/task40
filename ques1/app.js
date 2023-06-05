const express = require("express");
const app = express();
app.use(express.json());

// Array to store the created rooms
let rooms = [];

// API endpoint to create a new room
app.post("/rooms", (req, res) => {
  const { number, seats, amenities, price } = req.body;

  // Check if required fields are provided
  if (!number || !seats || !price) {
    return res
      .status(400)
      .json({ message: "Number, seats, and price are required fields." });
  }

  // Create a new room object
  const newRoom = {
    number,
    seats,
    amenities,
    price,
  };

  // Add the new room to the rooms array
  rooms.push(newRoom);

  return res.status(201).json({ message: "Room created successfully." });
});

// API endpoint to get all rooms
app.get("/rooms", (req, res) => {
  return res.status(200).json(rooms);
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
