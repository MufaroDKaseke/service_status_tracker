export default async function getAzureData(token, workspaceId, timespan) {
    const url = `https://api.loganalytics.azure.com/v1/workspaces/${workspaceId}/query`;
    
    const requestBody = {
        query: `AppAvailabilityResults | where TimeGenerated > ago(${timespan}) | project TimeGenerated, Success, DurationMs | extend Date = format_datetime(TimeGenerated, "yyyy-MM-dd") | summarize Success = min(toint(Success)), AvgDurationMs = avg(DurationMs), MinDurationMs = min(DurationMs), MaxDurationMs = max(DurationMs) by Date | order by Date asc`,
        // timespan: "PT31D"
    };
    
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(requestBody)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}
