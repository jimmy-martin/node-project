const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone_number: {
        type: String,
        required: false,
    },
});

const Contact = mongoose.model('contacts', ContactSchema);

module.exports = Contact;