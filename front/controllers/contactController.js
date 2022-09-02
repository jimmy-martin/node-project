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
    },

    showForm: (request, response) => {
        if (request.params.id) {
            axios.get('/contact/' + request.params.id)
                .then((res) => {
                    const contact = res.data;
                    response.render('contacts/create', {
                        contact: contact,
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            response.render('contacts/create');
        }
    },

    create: (request, response) => {
        axios.post('/contact', request.body)
            .then((res) => {
                const contact = res.data;
                response.redirect('/' + contact._id);
            })
            .catch((error) => {
                console.log(error);
            });
    },

    delete: (request, response) => {
        axios.delete('/contact/' + request.params.id)
            .then((res) => {
                response.redirect('/');
            })
            .catch((error) => {
                console.log(error);
            });
    },

}