const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        userName: { type: String, required: true },
        accountNumber: { type: Number, unique: true, required: true },
        emailAddress: { type: String, unique: true, required: true },
        identityNumber: { type: String, unique: true, required: true },
    },
    { timestamps: true }
);

// Gunakan mongoose.models untuk mencegah duplikasi model
module.exports = mongoose.models.User || mongoose.model("User", userSchema);
