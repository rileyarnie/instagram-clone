const express = require("express");
const authControllers = require("../controllers/authControllers");

const router = express.Router();

router.post("/register", authControllers.register);
router.post("/login", authControllers.login);
router.post("/logout", authControllers.logout); 

module.exports = router;
