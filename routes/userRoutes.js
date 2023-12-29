const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/user/login", userController.getUser);
router.post("/user", userController.createUser);

module.exports = router;
