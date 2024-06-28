const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.post('/webhook-handler', (req, res) => {
    const contact = req.body;

    if (contact && contact.properties) {
        let { firstname, lastname } = contact.properties;

        if (firstname) {
            firstname = firstname.charAt(0).toUpperCase() + firstname.slice(1).toLowerCase();
        }

        if (lastname) {
            lastname = lastname.charAt(0).toUpperCase() + lastname.slice(1).toLowerCase();
        }

        res.status(200).json({ firstname, lastname });
    } else {
        res.status(400).send('Invalid contact data');
    }
});

module.exports = app;
