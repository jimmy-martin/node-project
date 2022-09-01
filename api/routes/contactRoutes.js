const express = require("express");
const contactModel = require("../models/contactsModel");
const router = express.Router();

router.post("/contact", async (request, response) => {
  // console.log(request.body);
  const contact = new contactModel(request.body);

  try {
    await contact.save();
    response.send(contact);
  } catch (error) {
    response.status(500).send(error);
  }
});

router.get("/contact", async (request, response) => {
  const firstname = request.query.firstname;
  const lastname = request.query.lastname;
  const email = request.query.email;
  const phone_number = request.query.phone_number;

  // const contacts = await contactModel.find({
  //   firstname: firstname,
  //   lastname: lastname,
  // });

  const contacts = await contactModel.find({
    $or: [{
      firstname: firstname
    }, {
      lastname: lastname
    }, {
      email: email
    }]
  });

  try {
    response.send(contacts);
  } catch (error) {
    response.status(500).send(error);
  }
});

module.exports = router;