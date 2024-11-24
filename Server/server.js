const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

mongoose
  .connect("mongodb://localhost:27017/userData", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully!"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Middleware
app.use(cors({ origin: "http://localhost:5173", methods: ["GET", "POST"], credentials: true }));
app.use(express.json());

// Active chats and chat history
let activeChats = [];
const chatMessages = {}; // Chat history for each socket ID

io.on("connection", (socket) => {
  const isAdmin = socket.handshake.query.isAdmin === "true"; // Check if the connection is from an admin

  // Log connection type
  if (isAdmin) {
    console.log(`Admin connected: ${socket.id}`);
  } else {
    console.log(`User connected: ${socket.id}`);

    // Add user to activeChats only if not already present
    if (!activeChats.includes(socket.id)) {
      activeChats.push(socket.id);
      chatMessages[socket.id] = chatMessages[socket.id] || []; // Ensure chat history exists
      io.emit("active_chats", activeChats); // Broadcast updated active chats
    }
  }

  // Handle incoming messages
  socket.on("message", (msg) => {
    const { id, message, sender } = msg;

    // Add the message to the chat history
    if (!chatMessages[id]) chatMessages[id] = [];
    chatMessages[id].push(msg);

    // Emit the message to the correct recipient
    if (sender === "admin") {
      io.to(id).emit("message", msg); // Send to specific user
    } else {
      io.emit("message", msg); // Send to all admins
    }
  });

  // Handle request for chat history
  socket.on("fetch_chat", (chatId) => {
    const history = chatMessages[chatId] || []; // Retrieve chat history
    socket.emit("chat_history", { chatId, history }); // Send to the admin
  });

  // Handle disconnect
  socket.on("disconnect", () => {
    if (!isAdmin) {
      console.log(`User disconnected: ${socket.id}`);

      // Remove disconnected socket ID from activeChats
      activeChats = activeChats.filter((id) => id !== socket.id);
      io.emit("active_chats", activeChats); // Broadcast updated active chats
    } else {
      console.log(`Admin disconnected: ${socket.id}`);
    }
  });
});


server.listen(8080, () => console.log("Server running on http://localhost:8080"));
