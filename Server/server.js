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

const questionSchema = new mongoose.Schema({
  username: { type: String, required: true },
  questions: [{ type: String }],
  timestamp: { type: Date, default: Date.now }
});

// Create the Question model
const Question = mongoose.model("Question", questionSchema);

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

// Active chats and chat history
let activeChats = [];
const chatMessages = {}; // Chat history for each socket ID

// WebSocket Connection Handling
io.on("connection", (socket) => {
  const isAdmin = socket.handshake.query.isAdmin === "true"; // Determine if the client is an admin

  if (isAdmin) {
    console.log(`Admin connected: ${socket.id}`);
  } else {
    console.log(`User connected: ${socket.id}`);

    // Add user to activeChats
    if (!activeChats.includes(socket.id)) {
      activeChats.push(socket.id);
      chatMessages[socket.id] = chatMessages[socket.id] || []; // Initialize chat history
      io.emit("active_chats", activeChats); // Notify all clients about active chats
    }
  }

  // Handle incoming messages
  socket.on("message", (msg) => {
    const { id, message, sender } = msg;

    // Store message in chat history
    if (!chatMessages[id]) chatMessages[id] = [];
    chatMessages[id].push(msg);

    // Broadcast message
    if (sender === "admin") {
      io.to(id).emit("message", msg); // Send to a specific user
    } else {
      io.emit("message", msg); // Send to all admins
    }
  });

  // Fetch chat history
  socket.on("fetch_chat", (chatId) => {
    const history = chatMessages[chatId] || [];
    socket.emit("chat_history", { chatId, history });
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    if (!isAdmin) {
      console.log(`User disconnected: ${socket.id}`);
      activeChats = activeChats.filter((id) => id !== socket.id);
      io.emit("active_chats", activeChats);
    } else {
      console.log(`Admin disconnected: ${socket.id}`);
    }
  });
});

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

// POST /Login endpoint
app.post("/Login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if a user with the provided username and password exists
    const existingUser = await User.findOne({ username, password });

    if (existingUser) {
      return res.json("success"); // Login successful
    } else {
      return res.json("failure"); // Invalid credentials
    }
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json("Error during login");
  }
});

// POST endpoint to save questions
app.post("/saveQuestions", async (req, res) => {
  const { username, questions } = req.body;

  try {
    // Find existing questions for the user
    let userQuestions = await Question.findOne({ username });

    if (userQuestions) {
      // Update existing questions
      userQuestions.questions = questions;
      await userQuestions.save();
    } else {
      // Create new questions document
      userQuestions = new Question({
        username,
        questions
      });
      await userQuestions.save();
    }

    res.json({ success: true, message: "Questions saved successfully" });
  } catch (error) {
    console.error("Error saving questions:", error);
    res.status(500).json({ success: false, message: "Error saving questions" });
  }
});

// GET endpoint to retrieve questions
app.get("/getQuestions/:username", async (req, res) => {
  const { username } = req.params;

  try {
    const userQuestions = await Question.findOne({ username });
    if (userQuestions) {
      res.json({ success: true, questions: userQuestions.questions });
    } else {
      res.json({ success: true, questions: [] });
    }
  } catch (error) {
    console.error("Error retrieving questions:", error);
    res.status(500).json({ success: false, message: "Error retrieving questions" });
  }
});

// Start the server
server.listen(8080, () => {
  console.log("Server running on http://localhost:8080");
  console.log("WebSocket server running with Socket.IO");
});
