const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contactController");

router.get('/', contactController.readAll);

router.get('/new', contactController.showForm);

router.post('/new', contactController.create);

router.get('/delete/:id', contactController.delete);

router.get('/update/:id', contactController.showForm)

router.get('/:id', contactController.read);

module.exports = router;