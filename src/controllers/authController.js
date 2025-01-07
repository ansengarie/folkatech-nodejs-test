const Admin = require("../models/adminModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Tambah Admin Baru
exports.addAdmin = async (req, res) => {
    try {
        // Enkripsi password sebelum disimpan
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const admin = new Admin({
            adminName: req.body.adminName,
            emailAddress: req.body.emailAddress,
            password: hashedPassword, // Simpan password yang telah dienkripsi
        });

        await admin.save();
        res.status(201).json(admin);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// API untuk Generate Token
exports.generateToken = async (req, res) => {
    const { emailAddress, password } = req.body;

    try {
        // Cari admin berdasarkan email
        const admin = await Admin.findOne({ emailAddress });
        if (!admin) {
            console.log("Admin not found for email:", emailAddress);
            return res.status(401).json({ error: "Invalid email or password" });
        }

        // Periksa kecocokan password
        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            console.log("Password mismatch for email:", emailAddress);
            return res.status(401).json({ error: "Invalid email or password" });
        }

        // Buat JWT token
        const token = jwt.sign(
            { id: admin._id, email: admin.emailAddress },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(200).json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
};
