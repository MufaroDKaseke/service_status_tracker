import 'dotenv/config';
import express from 'express';
import getAzureToken from './azure_auth_token.js';
import getAzureData from './azure_api.js';
import cors from 'cors';

const app = express();
const port = 3000;

const tokenResponse = await getAzureToken(process.env.TENANT_ID, process.env.CLIENT_ID, process.env.CLIENT_SECRET);
const token = tokenResponse.access_token;

app.use(cors());

app.get('/api/data/:timespan', async (req, res) => {
  try {
    const data = await getAzureData(token, process.env.WORKSPACE_ID, req.params.timespan);
    res.json(data.tables[0].rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

