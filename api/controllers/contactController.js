const contactModel = require('../models/contactsModel');

module.exports = {

  create: async (request, response) => {
    const contact = new contactModel(request.body);
  
    try {
      await contact.save();
      response.status(201).send(contact);
    } catch (error) {
      response.status(500).send(error);
    }
  },
  
  read: async (request, response) => {
    const contact = await contactModel.findById(request.params.id);
  
    try {
      response.send(contact);
    } catch (error) {
      response.status(500).send(error);
    }
  },

  readAll: async (request, response) => {
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
  },

  update: async (request, response) => {
    try {
      await contactModel.findByIdAndUpdate(request.params.id, request.body);
      const updatedContact = await contactModel.findById(request.params.id);
      response.send(updatedContact);
    } catch (error) {
      response.status(500).send(error);
    }
  },

  delete: async (request, response) => {
    try {
      const deletedContact = await contactModel.findByIdAndDelete(request.params.id, request.body);
      response.send(deletedContact);
    } catch (error) {
      response.status(500).send(error);
    }
  },

};