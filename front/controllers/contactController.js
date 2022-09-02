const axios = require("axios").default;

module.exports = {

    readAll: (request, response) => {

        axios.get('/contact')
            .then((res) => {
                const contacts = res.data;
                response.render('contacts/readAll', {
                    contacts: contacts,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    },

    read: (request, response) => {
        axios.get('/contact/' + request.params.id)
            .then((res) => {
                const contact = res.data;
                response.render('contacts/read', {
                    contact: contact,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

}