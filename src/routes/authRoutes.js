const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Route untuk Tambah Admin
router.post("/add-admin", authController.addAdmin);

// Route untuk Generate Token
router.post("/generate-token", authController.generateToken);

module.exports = router;
