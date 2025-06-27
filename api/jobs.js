// api/jobs.js - Vercel serverless function
export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    // Fetch jobs.json from GitHub raw content
    const githubUrl = 'https://raw.githubusercontent.com/Code-Aaronn/harley-jai-care-proxy/main/jobs.json';
    
    const response = await fetch(githubUrl);
    
    if (!response.ok) {
      throw new Error(`GitHub fetch failed: ${response.status}`);
    }
    
    const jobsData = await response.json();
    
    // Return jobs with proper headers
    res.status(200).json({
      success: true,
      count: jobsData.length,
      jobs: jobsData,
      lastUpdated: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Error fetching jobs:', error);
    
    res.status(500).json({
      success: false,
      error: 'Failed to fetch job listings',
      message: error.message
    });
  }
}
