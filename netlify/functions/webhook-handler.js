import express from 'express';
import { json } from 'body-parser';
import { post } from 'axios';

const app = express();
app.use(json());

const HUBSPOT_API_KEY = process.env.HUBSPOT_API_KEY;

app.post('/webhook-handler', async (req, res) => {
    const contact = req.body;

    if (contact && contact.properties && contact.objectId) {
        let { firstname, lastname } = contact.properties;

        if (firstname) {
            firstname = firstname.charAt(0).toUpperCase() + firstname.slice(1).toLowerCase();
        }

        if (lastname) {
            lastname = lastname.charAt(0).toUpperCase() + lastname.slice(1).toLowerCase();
        }

        try {
            await post(
                `https://api.hubapi.com/contacts/v1/contact/vid/${contact.objectId}/profile`,
                {
                    properties: [
                        { property: 'firstname', value: firstname },
                        { property: 'lastname', value: lastname }
                    ]
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${HUBSPOT_API_KEY}`
                    }
                }
            );

            res.status(200).json({ firstname, lastname });
        } catch (error) {
            console.error('Error updating contact in HubSpot:', error);
            res.status(500).send('Failed to update contact');
        }
    } else {
        res.status(400).send('Invalid contact data');
    }
});

export default app;
