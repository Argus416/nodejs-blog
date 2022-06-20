const express = require("express");
const { main } = require("../controller/main");
const router = express.Router();

router.get("/", main);

module.exports = router;
