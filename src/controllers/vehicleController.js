const Vehicle = require("../models/vehicleModel");
const redisClient = require("../utils/redis");

// Fungsi untuk menambahkan kendaraan
exports.addVehicle = async (req, res) => {
    try {
        const vehicle = new Vehicle(req.body);
        await vehicle.save(); // Simpan ke MongoDB

        // Konversi nilai-nilai ke string sebelum menyimpan ke Redis
        await redisClient.sendCommand([
            "HSET",
            `vehicle:${vehicle.vehicleNumber}`,
            "vehicleNumber",
            vehicle.vehicleNumber,
            "ownerId",
            vehicle.ownerId.toString(), // Konversi ObjectId ke string
            "vehicleType",
            vehicle.vehicleType,
            "brand",
            vehicle.brand,
            "model",
            vehicle.model,
            "year",
            vehicle.year.toString(), // Konversi number ke string
        ]);

        res.status(201).json({
            message: "Vehicle added successfully",
            data: vehicle,
        });
    } catch (error) {
        console.error("Error adding vehicle:", error);
        res.status(500).json({
            message: "Error adding vehicle",
            error: error.message,
        });
    }
};

// Fungsi untuk mendapatkan kendaraan
exports.getVehicle = async (req, res) => {
    try {
        const { vehicleNumber } = req.params;

        // Cek data di Redis
        const vehicleData = await redisClient.hGetAll(
            `vehicle:${vehicleNumber}`
        );
        if (Object.keys(vehicleData).length > 0) {
            return res.status(200).json({
                message: "Vehicle fetched from cache",
                data: vehicleData,
            });
        }

        // Jika tidak ada di Redis, ambil dari MongoDB
        const vehicle = await Vehicle.findOne({ vehicleNumber }).populate(
            "ownerId"
        );
        if (!vehicle) {
            return res.status(404).json({ message: "Vehicle not found" });
        }

        // Simpan ke Redis
        await redisClient.hSet(
            `vehicle:${vehicleNumber}`,
            "vehicleNumber",
            vehicle.vehicleNumber,
            "ownerId",
            vehicle.ownerId.toString(),
            "vehicleType",
            vehicle.vehicleType,
            "brand",
            vehicle.brand,
            "model",
            vehicle.model,
            "year",
            vehicle.year.toString()
        );

        res.status(200).json({
            message: "Vehicle fetched from database",
            data: vehicle,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error fetching vehicle",
            error: error.message,
        });
    }
};

// Fungsi untuk menghapus kendaraan
exports.deleteVehicle = async (req, res) => {
    try {
        const { vehicleNumber } = req.params;

        const deletedVehicle = await Vehicle.findOneAndDelete({
            vehicleNumber,
        });
        if (!deletedVehicle) {
            return res.status(404).json({ message: "Vehicle not found" });
        }

        // Hapus dari Redis
        await redisClient.del(`vehicle:${vehicleNumber}`);

        res.status(200).json({
            message: "Vehicle deleted successfully",
            data: deletedVehicle,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error deleting vehicle",
            error: error.message,
        });
    }
};
