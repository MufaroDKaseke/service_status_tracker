import 'dotenv/config';
import express from 'express';
import getAzureToken from './azure_auth_token.js';
import getAzureData from './azure_api.js';
import cors from 'cors';

const app = express();
const port = 3000;

let token;

const fetchToken = async () => {
  try {
    const tokenResponse = await getAzureToken(process.env.TENANT_ID, process.env.CLIENT_ID, process.env.CLIENT_SECRET);
    token = tokenResponse.access_token;
    console.log('Token refreshed');
  } catch (error) {
    console.error('Failed to fetch token', error);
  }
};

// Initial token fetch
fetchToken();

// Refresh token every 50 minutes
setInterval(fetchToken, 3000000);

// Fix CORS error
app.use(cors());

// Get All Days Data
app.get('/api/data/all/:timespan', async (req, res) => {
  try {
    let query = `AppAvailabilityResults | where TimeGenerated > ago(${req.params.timespan}) | extend TimeGenerated = datetime_utc_to_local(TimeGenerated, '${req.query.timezone}') | project TimeGenerated, Success, DurationMs | extend Date = format_datetime(TimeGenerated, "yyyy-MM-dd") | summarize Success = min(toint(Success)), AvgDurationMs = avg(DurationMs), MinDurationMs = min(DurationMs), MaxDurationMs = max(DurationMs) by Date | order by Date asc`;
    const data = await getAzureData(token, process.env.WORKSPACE_ID, query);
    res.json(data.tables[0].rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

// Get Cuurrent Status
app.get('/api/data/latest', async (req, res) => {
  try {
    let query = `AppAvailabilityResults | extend TimeGenerated = datetime_utc_to_local(TimeGenerated, '${req.query.timezone}') | top 1 by TimeGenerated desc | extend Date = format_datetime(TimeGenerated, "yyyy-MM-dd"), Time = format_datetime(TimeGenerated, "HH:mm:ss") | project Date, Time, Success, DurationMs`;
    const data = await getAzureData(token, process.env.WORKSPACE_ID, query);
    res.json(data.tables[0].rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

// Get Specific Date's data
app.get('/api/data/:date', async (req, res) => {
  try {
    let query = `AppAvailabilityResults | extend TimeGenerated = datetime_utc_to_local(TimeGenerated, '${req.query.timezone}')  |  extend Date = format_datetime(TimeGenerated, "yyyy-MM-dd"), Time = format_datetime(TimeGenerated, "HH:mm:ss") | where Date == "${req.params.date}" | project Date, Time, Success, DurationMs  | order by Time asc | top 1 by Time asc`;
    const data = await getAzureData(token, process.env.WORKSPACE_ID, query);
    res.json(data.tables[0].rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

