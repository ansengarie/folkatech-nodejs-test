const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const auth = require("../middleware/auth");

// CRUD Routes (lindungi dengan middleware `auth`)
router.post("/", auth, userController.createUser);
router.get("/", auth, userController.getUsers);
router.get(
    "/account/:accountNumber",
    auth,
    userController.getUserByAccountNumber
);
router.get(
    "/identity/:identityNumber",
    auth,
    userController.getUserByIdentityNumber
);
router.put("/:id", auth, userController.updateUser);
router.delete("/:id", auth, userController.deleteUser);

module.exports = router;
