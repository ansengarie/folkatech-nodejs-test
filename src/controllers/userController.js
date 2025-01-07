const User = require("../models/userModel");

// READ All Users dengan Pagination
exports.getUsers = async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Mengambil parameter page dari query, default ke halaman 1
    const limit = parseInt(req.query.limit) || 10; // Mengambil parameter limit dari query, default 10 data per halaman
    const skip = (page - 1) * limit; // Menghitung data yang dilewatkan

    try {
        // Mengambil data dengan pagination
        const users = await User.find()
            .skip(skip) // Lewati data sesuai dengan halaman
            .limit(limit); // Batasi jumlah data per halaman

        // Hitung total jumlah data
        const totalCount = await User.countDocuments();

        // Hitung total halaman
        const totalPages = Math.ceil(totalCount / limit);

        // Format data sebelum dikirimkan
        const formattedUsers = users.map((user) => ({
            id: user._id,
            userName: user.userName,
            accountNumber: user.accountNumber,
            emailAddress: user.emailAddress,
            identityNumber: user.identityNumber,
        }));

        // Kirimkan response
        res.status(200).json({
            status: "success",
            message: "Users retrieved successfully",
            data: formattedUsers,
            pagination: {
                currentPage: page,
                totalPages: totalPages,
                totalCount: totalCount,
            },
        });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};
// CREATE User
exports.createUser = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();

        res.status(201).json({
            status: "success",
            message: "User created successfully",
            data: {
                id: user._id,
                userName: user.userName,
                accountNumber: user.accountNumber,
                emailAddress: user.emailAddress,
                identityNumber: user.identityNumber,
            },
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// READ by Account Number
exports.getUserByAccountNumber = async (req, res) => {
    try {
        const user = await User.findOne({
            accountNumber: req.params.accountNumber,
        });
        if (!user) return res.status(404).json({ error: "User not found" });

        res.status(200).json({
            status: "success",
            message: "User retrieved successfully",
            data: {
                id: user._id,
                userName: user.userName,
                accountNumber: user.accountNumber,
                emailAddress: user.emailAddress,
                identityNumber: user.identityNumber,
            },
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// READ by Identity Number
exports.getUserByIdentityNumber = async (req, res) => {
    try {
        const user = await User.findOne({
            identityNumber: req.params.identityNumber,
        });
        if (!user) return res.status(404).json({ error: "User not found" });

        res.status(200).json({
            status: "success",
            message: "User retrieved successfully",
            data: {
                id: user._id,
                userName: user.userName,
                accountNumber: user.accountNumber,
                emailAddress: user.emailAddress,
                identityNumber: user.identityNumber,
            },
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// UPDATE User
exports.updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!user) return res.status(404).json({ error: "User not found" });

        res.status(200).json({
            status: "success",
            message: "User updated successfully",
            data: {
                id: user._id,
                userName: user.userName,
                accountNumber: user.accountNumber,
                emailAddress: user.emailAddress,
                identityNumber: user.identityNumber,
            },
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// DELETE User
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ error: "User not found" });

        res.status(200).json({
            status: "success",
            message: "User deleted successfully",
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
