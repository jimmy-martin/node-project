const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contactController");

router.get('/contact/:id', contactController.read);
router.get('/', contactController.readAll);

module.exports = router;