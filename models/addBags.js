const mongoose = require("mongoose");

const BagSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "fullName is required"]
    },
    desc: {
        type: String,
        required: [true, "A Description is required"]
    },
    price: {
        type: String,
        required: [true, "Price placement is required"]
    }
},
{
    timestamps: true
});

const addBags = mongoose.model("Addbags", BagSchema)

module.exports = addBags