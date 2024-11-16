const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/userData", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("MongoDB connected successfully!");
}).catch(err => {
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
const corsOptions = {
    origin: ["http://localhost:5173"], // Adjust according to your frontend URL
};

// Middleware
app.use(cors(corsOptions)); // Enable CORS
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

// Start the server
app.listen(8080, () => {
    console.log("Server running on http://localhost:8080");
});
