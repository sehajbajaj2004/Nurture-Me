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

const corsOptions = {
    origin: ["http://localhost:5173"],
};

// Enable CORS and JSON parsing middleware
app.use(cors(corsOptions));
app.use(express.json());

app.post("/Register", async (req, res) => {
    const { username, email, phone, password } = req.body;

    const data = {
        username,
        email,
        phone,
        password, // Remember to hash passwords in production
    };

    try {
        const check = await User.findOne({ email: email });

        if (check) {
            return res.json("exist"); // User already exists
        } else {
            await User.create(data); // Save new user
            return res.json("nonexist"); // New user created
        }
    } catch (error) {
        console.error("Error inserting data:", error);
        return res.status(500).json("Error saving user");
    }
});


// Start server
app.listen(8080, () => {
    console.log("Server running on port 8080");
});
