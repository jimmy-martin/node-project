const express = require("express");
const contactModel = require("../models/contactsModel");
const router = express.Router();

router.post("/contact", async (request, response) => {
  const contact = new contactModel(request.body);

  try {
    await contact.save();
    response.status(201).send(contact);
  } catch (error) {
    response.status(500).send(error);
  }
});

router.get("/contact", async (request, response) => {
  if (Object.keys(request.query).length !== 0) {
    const firstname = request.query.firstname || 0;
    const lastname = request.query.lastname || 0;
    const email = request.query.email || 0;
    const phone_number = request.query.phone_number || -1;

    var contacts = await contactModel.find({
      $or: [{
        firstname: new RegExp(firstname)
      }, {
        lastname: new RegExp(lastname)
      }, {
        email: new RegExp(email)
      }, {
        phone_number: new RegExp(phone_number)
      }]
    });

  } else {
    var contacts = await contactModel.find({});
  }

  try {
    response.send(contacts);
  } catch (error) {
    response.status(500).send(error);
  }
});

router.post("/contact/:id", async (request, response) => {
  try {
    const contact = await contactModel.findByIdAndUpdate(request.params.id, request.body);
    response.send(await contactModel.findById(request.params.id));
  } catch (error) {
    response.status(500).send(error);
  }
});

module.exports = router;