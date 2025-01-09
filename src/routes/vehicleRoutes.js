const express = require("express");
const {
    addVehicle,
    getVehicle,
    deleteVehicle,
} = require("../controllers/vehicleController");
const router = express.Router();

router.post("/", addVehicle);
router.get("/:vehicleNumber", getVehicle);
router.delete("/:vehicleNumber", deleteVehicle);

module.exports = router;
