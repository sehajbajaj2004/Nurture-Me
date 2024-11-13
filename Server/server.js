const express = require("express");
const app = express();

const cors = require("cors");
const corsOptions = {
    origin: ["http://localhost:5173"],
};

app.use(cors(corsOptions));

app.get("/api", (req,res) => {
    res.json({fruits: ["apple", "banana", "grapes"]});
});

app.listen(8080, () => {
    console.log("App started on port 8080");
});



