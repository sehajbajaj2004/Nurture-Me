const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http"); // For creating an HTTP server
const { Server } = require("socket.io"); // Importing Socket.IO

const app = express();
const server = http.createServer(app); // Create an HTTP server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Adjust to your frontend URL
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// MongoDB connection
mongoose
  .connect("mongodb://localhost:27017/userData", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected successfully!");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Define the User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
});

// Create the User model
const User = mongoose.model("User", userSchema);

// CORS Configuration
app.use(
  cors({
    origin: "http://localhost:5173", // Adjust to your frontend URL
    methods: ["GET", "POST"],
    credentials: true,
  })
);

// Middleware
app.use(express.json()); // Parse JSON requests

// POST /Register endpoint
app.post("/Register", async (req, res) => {
  const { username, email, phone, password } = req.body;

  try {
    // Check if a user with the provided email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.json("exist"); // User already exists
    }

    // Save the new user to the database
    const newUser = new User({
      username,
      email,
      phone,
      password, // Remember: Hash passwords for security in production
    });

    await newUser.save();
    return res.json("nonexist"); // New user created
  } catch (error) {
    console.error("Error inserting data:", error);
    return res.status(500).json("Error saving user");
  }
});

// Placeholder API route
app.get("/api", (req, res) => {
  res.json({ message: "API is working!" });
});

// Track active chats
let activeChats = [];

// Socket.IO connection
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Add the new socket ID to activeChats
  activeChats.push(socket.id);

  // Emit the updated active chats to all clients
  io.emit("active_chats", activeChats);

  // Listen for messages from the client
  socket.on("message", (msg) => {
    console.log("Message received:", msg);
    io.emit("message", msg); // Broadcast the message to all connected clients
  });

  // Emit chat messages to the admin when requested
  socket.on("fetch_messages", (chatId) => {
    console.log(`Fetching messages for chat: ${chatId}`);
    // Simulate fetching chat messages from a database (replace with real DB logic)
    const dummyMessages = [
      { id: chatId, message: "Hello from chat " + chatId },
      { id: chatId, message: "How can I help you?" },
    ];
    socket.emit("chat_messages", dummyMessages);
  });

  // Disconnect event
  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);

    // Remove the socket ID from activeChats
    activeChats = activeChats.filter((id) => id !== socket.id);

    // Emit the updated active chats to all clients
    io.emit("active_chats", activeChats);
  });
});

// Start the server
server.listen(8080, () => {
  console.log("Server running on http://localhost:8080");
  console.log("WebSocket server running with Socket.IO");
});
