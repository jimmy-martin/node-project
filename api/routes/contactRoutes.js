const express = require("express");
const contactModel = require("../models/contactsModel");
const router = express.Router();

router.post("/contact", async (request, response) => {
  console.log(request.body)
  const contact = new contactModel(request.body);

  try {
    await contact.save();
    response.send(user);
  } catch (error) {
    response.status(500).send(error);
  }
});

router.get("/contact", async (request, response) => {
  const contacts = await contactModel.find({});

  try {
    response.send(contacts);
  } catch (error) {
    response.status(500).send(error);
  }
});

module.exports = router;