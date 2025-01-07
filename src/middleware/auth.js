const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    // Ambil token dari header Authorization
    const token = req.headers["authorization"];

    // Pastikan token diawali dengan "Bearer "
    if (!token || !token.startsWith("Bearer ")) {
        return res.status(401).send("Access Denied");
    }

    // Ambil token tanpa "Bearer " (menghapus "Bearer " dari token)
    const actualToken = token.split(" ")[1];

    try {
        // Verifikasi token
        const verified = jwt.verify(actualToken, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send("Invalid Token");
    }
};
