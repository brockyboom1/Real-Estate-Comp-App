const puppeteer = require('puppeteer');
const fs = require('fs-extra');
const path = require('path');
const UserAgent = require('user-agents');
const express = require('express');
const NodeGeocoder = require('node-geocoder');

// Set up geocoder with Google Maps API
const geocoder = NodeGeocoder({
  provider: 'google',
  apiKey: 'AIzaSyCPGzKsZchYfWG7uYpa3ZYJgUCYS0c9_fU' // Your Google Maps API key
});

// URLs to scrape
const agencyUrls = [
  'https://www.realestate.com.au/agency/belle-property-south-yarra-XHSSOU',
  'https://www.realestate.com.au/agency/kay-burton-stonnington-KAYSOU',
  'https://www.realestate.com.au/agency/woodards-south-yarra-WILSOU'
];

// Path to save the scraped data
const dataPath = path.join(__dirname, 'public', 'data', 'agencies.json');

/**
 * Scrapes real estate agency data from realestate.com.au
 */
async function scrapeAgencyData(url) {
  console.log(`Scraping data from ${url}...`);
  
  // Generate a random user agent
  const userAgent = new UserAgent();
  
  // Launch browser with stealth options
  const browser = await puppeteer.launch({
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-features=IsolateOrigins,site-per-process'
    ]
  });
  
  try {
    const page = await browser.newPage();
    
    // Set user agent and viewport
    await page.setUserAgent(userAgent.toString());
    await page.setViewport({ width: 1366, height: 768 });
    
    // Enable request interception to avoid unnecessary resources
    await page.setRequestInterception(true);
    page.on('request', (req) => {
      const resourceType = req.resourceType();
      if (resourceType === 'image' || resourceType === 'font' || resourceType === 'media') {
        req.abort();
      } else {
        req.continue();
      }
    });
    
    // Navigate to the page
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    
    // Wait for the key statistics to load
    await page.waitForSelector('.css-118v8b8', { timeout: 30000 }).catch(() => console.log('Timeout waiting for statistics'));
    
    // Extract agency name
    const agencyName = await page.evaluate(() => {
      const nameElement = document.querySelector('h1.css-164r41r');
      return nameElement ? nameElement.textContent.trim() : 'Unknown Agency';
    });
    
    // Extract address
    const address = await page.evaluate(() => {
      const addressElement = document.querySelector('.css-9wv9ql');
      return addressElement ? addressElement.textContent.trim() : 'Unknown Address';
    });
    
    // Extract agency stats
    const stats = await page.evaluate(() => {
      const statsData = {};
      
      // Find all stat boxes
      const statBoxes = document.querySelectorAll('.css-118v8b8');
      
      for (const box of statBoxes) {
        // Get the value and label
        const valueElement = box.querySelector('span.css-prd0f0');
        const labelElement = box.querySelector('span.css-1q5xfwz');
        
        if (valueElement && labelElement) {
          const value = valueElement.textContent.trim();
          const label = labelElement.textContent.trim().toLowerCase();
          
          if (label.includes('median leased price')) {
            statsData.medianLeasePrice = value;
          } else if (label.includes('median days advertised')) {
            statsData.medianDaysAdvertised = parseInt(value) || 0;
          } else if (label.includes('properties leased')) {
            statsData.propertiesLeased = parseInt(value) || 0;
          } else if (label.includes('properties for rent')) {
            statsData.propertiesForRent = parseInt(value) || 0;
          }
        }
      }
      
      return statsData;
    });
    
    // Get coordinates using Google's Geocoding API
    let coordinates = { lat: 0, lng: 0 };
    try {
      const geocodeResult = await geocoder.geocode(`${address}, Australia`);
      if (geocodeResult && geocodeResult.length > 0) {
        coordinates = {
          lat: geocodeResult[0].latitude,
          lng: geocodeResult[0].longitude
        };
      } else {
        // Fallback to random position near South Yarra if geocoding fails
        coordinates = {
          lat: -37.84 + (Math.random() * 0.02),
          lng: 144.99 + (Math.random() * 0.02)
        };
      }
    } catch (geocodeError) {
      console.error('Geocoding error:', geocodeError);
      // Fallback to random position
      coordinates = {
        lat: -37.84 + (Math.random() * 0.02),
        lng: 144.99 + (Math.random() * 0.02)
      };
    }
    
    // Extract agency ID from URL
    const agencyId = url.split('-').pop();
    
    // Combine all data
    const agencyData = {
      id: agencyId,
      name: agencyName,
      address: address,
      lat: coordinates.lat,
      lng: coordinates.lng,
      medianLeasePrice: stats.medianLeasePrice || 'N/A',
      medianDaysAdvertised: stats.medianDaysAdvertised || 0,
      propertiesLeased: stats.propertiesLeased || 0,
      propertiesForRent: stats.propertiesForRent || 0,
      profileUrl: url
    };
    
    console.log(`Scraped data for ${agencyName}`);
    return agencyData;
    
  } catch (error) {
    console.error(`Error scraping ${url}:`, error);
    return null;
  } finally {
    await browser.close();
  }
}

/**
 * Scrapes all agencies and saves data to a JSON file
 */
async function scrapeAllAgencies() {
  console.log('Starting scraping process...');
  
  // Create data directory if it doesn't exist
  await fs.ensureDir(path.join(__dirname, 'public', 'data'));
  
  const agencies = [];
  
  for (const url of agencyUrls) {
    const agencyData = await scrapeAgencyData(url);
    if (agencyData) {
      agencies.push(agencyData);
    }
  }
  
  // Save the scraped data to a JSON file
  await fs.writeJSON(dataPath, agencies, { spaces: 2 });
  
  console.log(`Scraped data for ${agencies.length} agencies and saved to ${dataPath}`);
  return agencies;
}

/**
 * Set up Express server
 */
function setupServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;
  
  // Serve static files from the 'public' directory
  app.use(express.static(path.join(__dirname, 'public')));
  
  // API endpoint to get agency data
  app.get('/api/agencies', async (req, res) => {
    try {
      if (await fs.pathExists(dataPath)) {
        const agencies = await fs.readJSON(dataPath);
        res.json(agencies);
      } else {
        res.status(404).json({ error: 'No agency data found. Run the scraper first.' });
      }
    } catch (error) {
      console.error('Error reading agency data:', error);
      res.status(500).json({ error: 'Failed to retrieve agency data' });
    }
  });
  
  // API endpoint to trigger a new scrape
  app.get('/api/scrape', async (req, res) => {
    try {
      const agencies = await scrapeAllAgencies();
      res.json({ success: true, count: agencies.length });
    } catch (error) {
      console.error('Error during scraping:', error);
      res.status(500).json({ error: 'Scraping failed' });
    }
  });
  
  // Serve the main application
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
  
  // Start the server
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

// Main execution
async function main() {
  try {
    // Check if data already exists
    const dataExists = await fs.pathExists(dataPath);
    
    if (!dataExists) {
      console.log('No existing data found. Running initial scrape...');
      await scrapeAllAgencies();
    } else {
      console.log('Using existing agency data. To refresh, use /api/scrape endpoint.');
    }
    
    // Start the server
    setupServer();
    
  } catch (error) {
    console.error('Application error:', error);
  }
}

// Run the application
main();