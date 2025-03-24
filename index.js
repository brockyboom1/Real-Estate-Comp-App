const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Serve static files from public directory
app.use(express.static('public'));

// Read agents data from JSON file
const agentsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'agents.json')));

// Hardcoded agency data
const agencies = [
    {
        name: "Melcorp Real Estate",
        address: "477 Swanston St, Melbourne VIC 3000",
        phone: "03 9663 1117",
        lat: -37.809847,
        lng: 144.963168,
        medianLeasePrice: "550",
        medianDaysAdvertised: "32",
        propertiesLeased: "1,245",
        propertiesForRent: "89"
    },
    {
        name: "VicProp",
        address: "379 Collins St, Melbourne VIC 3000",
        phone: "03 9670 7333",
        lat: -37.816893,
        lng: 144.959744,
        medianLeasePrice: "580",
        medianDaysAdvertised: "28",
        propertiesLeased: "890",
        propertiesForRent: "76"
    },
    {
        name: "Kay & Burton Stonnington",
        address: "Level 7/505 Toorak Rd, Toorak VIC 3142",
        phone: "03 9820 1111",
        lat: -37.840027,
        lng: 145.008913,
        medianLeasePrice: "850",
        medianDaysAdvertised: "25",
        propertiesLeased: "456",
        propertiesForRent: "42"
    },
    {
        name: "Belle Property",
        address: "85 Toorak Road, South Yarra, VIC 3141",
        phone: "03 9866 1888",
        lat: -37.838791,
        lng: 144.995197,
        medianLeasePrice: "620",
        medianDaysAdvertised: "29",
        propertiesLeased: "678",
        propertiesForRent: "55",
        staff: [
            {
                name: "Nick Gatacre",
                position: "Principal | Director",
                phone: "0428 860 425",
                performance: {
                    medianSoldPrice: "$750k",
                    medianDaysAdvertised: 31,
                    propertiesSoldLead: 25,
                    propertiesSoldSecondary: 18
                }
            },
            {
                name: "Grant Wallace",
                position: "Principal | Director",
                phone: "0401 478 211",
                performance: {
                    medianSoldPrice: "$780k",
                    medianDaysAdvertised: 29,
                    propertiesSoldLead: 27,
                    propertiesSoldSecondary: 24
                }
            },
            {
                name: "Mark Konishi",
                position: "Principal | Director",
                phone: "0412 825 852",
                performance: {
                    medianSoldPrice: "$720k",
                    medianDaysAdvertised: 32,
                    propertiesSoldLead: 23,
                    propertiesSoldSecondary: 19
                }
            },
            {
                name: "Peter Perrignon",
                position: "Principal",
                phone: "0418 566 846"
            },
            {
                name: "Anthony Benic",
                position: "Sales Associate",
                phone: "0466 474 536"
            },
            {
                name: "Carla Girolamo",
                position: "Sales Associate",
                phone: "0449 687 978"
            },
            {
                name: "Tyson Powell",
                position: "Sales Associate",
                phone: "0404 822 851"
            },
            {
                name: "Mathew Crothers",
                position: "Sales Associate",
                phone: "0421 699 639"
            },
            {
                name: "Jo Leonardis",
                position: "Head of Property Management",
                phone: "0419 565 859"
            },
            {
                name: "Todd George",
                position: "Business Development Manager",
                phone: "0478 398 159"
            },
            {
                name: "Melissa Lloyd",
                position: "Senior Property Manager",
                phone: "0430 300 549"
            },
            {
                name: "Laura Thorwesten",
                position: "Property Manager",
                phone: "0419 416 144"
            },
            {
                name: "Angela Keenan",
                position: "Property Manager",
                phone: "0448 916 480"
            },
            {
                name: "Sam Landale",
                position: "Leasing Consultant",
                phone: "0431 280 974"
            },
            {
                name: "Finn Walker",
                position: "Property Manager",
                phone: "0430 300 552"
            },
            {
                name: "Jason Tan",
                position: "Property Management Assistant",
                phone: "0422 188 055"
            },
            {
                name: "Stamatia Pagouras",
                position: "Property Manager",
                phone: "0458 006 546"
            }
        ],
        reviews: {
            good: ["Excellent service", "Professional team", "Great property management"],
            bad: ["Response time could be better", "Communication needs improvement"]
        }
    },
    {
        name: "Woodards",
        address: "Level 1, 157 Toorak Rd, South Yarra, VIC 3141",
        phone: "03 9866 4411",
        lat: -37.839392,
        lng: 144.997391,
        medianLeasePrice: "595",
        medianDaysAdvertised: "30",
        propertiesLeased: "723",
        propertiesForRent: "63"
    }
];

// API endpoint to get agency data
app.get('/api/agencies', (req, res) => {
    // Merge agents data with agency data
    const agenciesWithStaff = agencies.map(agency => {
        const agentData = agentsData[agency.name.toLowerCase()];
        if (agentData) {
            return {
                ...agency,
                staff: agentData.team
            };
        }
        return agency;
    });
    res.json(agenciesWithStaff);
});

// Route for Woodards staff page
app.get('/woodards-staff', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'woodards-staff.html'));
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});