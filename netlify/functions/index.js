const app = require('./webhook-handler');

const serverless = require('serverless-http');

module.exports.handler = serverless(app);
