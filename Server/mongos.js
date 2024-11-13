const mongoose = require("mogoose")
mongoose.connect("mongodb://localhost:27017/")
.then(() =>{
    console.log("conncted");
})
.catch(() => {
    console.log("failed");
})

const newSchema = new mongoose.Schema({
    
})