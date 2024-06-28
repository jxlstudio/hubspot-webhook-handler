import serverless from 'serverless-http';
import app from './webhook-handler';

export const handler = serverless(app);
