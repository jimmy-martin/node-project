const express = require("express");
const router = express.Router();
const contactController = require('../controllers/contactController');

router.post("/contact", contactController.create);

router.get("/contact/:id", contactController.read);

router.get("/contact", contactController.readAll);

router.post("/contact/:id", contactController.update);

router.delete("/contact/:id", contactController.delete);

module.exports = router;