export default  async function getAzureData(token, workspaceId, query) {
    const url = `https://api.loganalytics.azure.com/v1/workspaces/${workspaceId}/query`;
    
    const requestBody = {
        query: `${query}`,
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