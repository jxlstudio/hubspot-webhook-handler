const serverless = require('serverless-http');
const app = require('./webhook-handler');

module.exports.handler = serverless(app);
