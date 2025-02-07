export default async function getAzureToken(tenantId, clientId, clientSecret) {
    const url = `https://login.microsoftonline.com/${tenantId}/oauth2/token`;
    
    const params = new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: clientId,
        client_secret: clientSecret,
        resource: 'https://api.loganalytics.io'
    });
    
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: params
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error fetching token:', error);
        throw error;
    }
}