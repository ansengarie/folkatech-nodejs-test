const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
    vehicleNumber: { type: String, unique: true, required: true },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    vehicleType: { type: String, required: true },
    brand: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
});

module.exports = mongoose.model("Vehicle", vehicleSchema);
