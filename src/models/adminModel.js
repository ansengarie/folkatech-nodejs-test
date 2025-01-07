const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const adminSchema = new mongoose.Schema(
    {
        adminName: { type: String, required: true },
        emailAddress: { type: String, unique: true, required: true },
        password: { type: String, required: true },
    },
    { timestamps: true }
);

// Gunakan mongoose.models untuk mencegah duplikasi model
module.exports = mongoose.models.Admin || mongoose.model("Admin", adminSchema);
