const axios = require('axios');

const HUBSPOT_API_KEY = process.env.HUBSPOT_API_KEY;

exports.handler = async function(event, context) {
    const contact = JSON.parse(event.body);

    if (contact && contact.properties && contact.objectId) {
        let { firstname, lastname } = contact.properties;

        if (firstname) {
            firstname = firstname.charAt(0).toUpperCase() + firstname.slice(1).toLowerCase();
        }

        if (lastname) {
            lastname = lastname.charAt(0).toUpperCase() + lastname.slice(1).toLowerCase();
        }

        try {
            await axios.post(
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

            return {
                statusCode: 200,
                body: JSON.stringify({ firstname, lastname })
            };
        } catch (error) {
            console.error('Error updating contact in HubSpot:', error);
            return {
                statusCode: 500,
                body: 'Failed to update contact'
            };
        }
    } else {
        return {
            statusCode: 400,
            body: 'Invalid contact data'
        };
    }
};
