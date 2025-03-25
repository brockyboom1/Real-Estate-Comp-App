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
        lat: -37.8397,
        lng: 144.9959,
        medianLeasePrice: 620,
        medianDaysAdvertised: 29,
        propertiesLeased: 678,
        propertiesForRent: 55,
        staff: [
            {
                name: 'Nick Gatacre',
                position: 'Director / Auctioneer / Licensed Estate Agent',
                phone: '0425 853 259',
                photo: '/images/agents/Suburbs/South Yarra - 3141/Belle Property/nick gatacre.jpeg',
                performance: {
                    medianSoldPrice: "835",
                    medianDaysAdvertised: 28,
                    propertiesSoldLead: 26,
                    propertiesSoldSecondary: 4
                }
            },
            {
                name: 'Grant Wallace',
                position: 'Principal Director / Auctioneer / Licensed Estate Agent',
                phone: '0401 478 211',
                photo: '/images/agents/Suburbs/South Yarra - 3141/Belle Property/grant wallace.jpeg',
                performance: {
                    medianSoldPrice: "780",
                    medianDaysAdvertised: 29,
                    propertiesSoldLead: 26,
                    propertiesSoldSecondary: 23
                }
            },
            {
                name: 'Mark Konishi',
                position: 'Director / Auctioneer / Licensed Estate Agent',
                phone: '0412 825 852',
                photo: '/images/agents/Suburbs/South Yarra - 3141/Belle Property/mark konishi.jpeg',
                performance: {
                    medianSoldPrice: "590",
                    medianDaysAdvertised: 43,
                    propertiesSoldLead: 37,
                    propertiesSoldSecondary: 60
                }
            },
            {
                name: 'Peter Perrignon',
                position: 'Licensed Estate Agent',
                phone: '0418 566 846',
                photo: '/images/agents/Suburbs/South Yarra - 3141/Belle Property/peter perrignon.jpeg',
                performance: {
                    medianSoldPrice: "655",
                    medianDaysAdvertised: 29,
                    propertiesSoldLead: 26,
                    propertiesSoldSecondary: 5
                }
            },
            {
                name: 'Carla Girolamo',
                position: 'Sales Associate',
                phone: '0419 522 572',
                photo: '/images/agents/Suburbs/South Yarra - 3141/Belle Property/carla girolamo.jpg',
                performance: {
                    medianSoldPrice: "820",
                    medianDaysAdvertised: 53,
                    propertiesSoldLead: 0,
                    propertiesSoldSecondary: 11
                }
            },
            {
                name: 'Mathew Crothers',
                position: 'Sales Associate',
                phone: '0411 576 697',
                photo: '/images/agents/Suburbs/South Yarra - 3141/Belle Property/mathew crothers.jpg',
                performance: {
                    medianSoldPrice: "825",
                    medianDaysAdvertised: 29,
                    propertiesSoldLead: 1,
                    propertiesSoldSecondary: 20
                }
            },
            {
                name: 'Anthony Benic',
                position: 'Sales Associate',
                phone: '0466 474 536',
                photo: '/images/agents/Suburbs/South Yarra - 3141/Belle Property/anthony benic.jpg',
                performance: {
                    medianSoldPrice: "445",
                    medianDaysAdvertised: 42,
                    propertiesSoldLead: 35,
                    propertiesSoldSecondary: 14
                }
            },
            {
                name: 'Tyson Powell',
                position: 'Sales Associate',
                phone: '0404 822 851',
                photo: '/images/agents/Suburbs/South Yarra - 3141/Belle Property/tyson powell.jpg',
                performance: {
                    medianSoldPrice: "640",
                    medianDaysAdvertised: 65,
                    propertiesSoldLead: 15,
                    propertiesSoldSecondary: 20
                }
            },
            {
                name: 'Finn Walker',
                position: 'Property Manager',
                phone: '0411 576 697',
                photo: '/images/agents/Suburbs/South Yarra - 3141/Belle Property/finn walker.jpg',
                performance: {
                    propertiesLeased: 5,
                    medianLeasedPrice: 520
                }
            },
            {
                name: 'Jason Tan',
                position: 'Property Management Assistant',
                phone: '0425 853 259',
                photo: '/images/agents/Suburbs/South Yarra - 3141/Belle Property/jason tan.jpg'
            },
            {
                name: 'Laura Thorwesten',
                position: 'Property Manager',
                phone: '0419 522 572',
                photo: '/images/agents/Suburbs/South Yarra - 3141/Belle Property/laura thorwesten.jpg',
                performance: {
                    propertiesLeased: 8,
                    medianLeasedPrice: 495
                }
            },
            {
                name: 'Melissa Lloyd',
                position: 'Senior Property Manager',
                phone: '0411 576 697',
                photo: '/images/agents/Suburbs/South Yarra - 3141/Belle Property/melissa lloyd.png',
                performance: {
                    propertiesLeased: 12,
                    medianLeasedPrice: 580
                }
            },
            {
                name: 'Sam Landale',
                position: 'Leasing Consultant',
                phone: '0411 576 697',
                photo: '/images/agents/Suburbs/South Yarra - 3141/Belle Property/sam landale.jpg'
            },
            {
                name: 'Stamtia Pagouras',
                position: 'Property Manager',
                phone: '0425 853 259',
                photo: '/images/agents/Suburbs/South Yarra - 3141/Belle Property/stamtia pagouras.jpg',
                performance: {
                    propertiesLeased: 7,
                    medianLeasedPrice: 510
                }
            },
            {
                name: 'Todd George',
                position: 'Business Development Manager',
                phone: '0419 522 572',
                photo: '/images/agents/Suburbs/South Yarra - 3141/Belle Property/todd george.jpg'
            },
            {
                name: 'Angela Keenan',
                position: 'Property Manager',
                phone: '0411 576 697',
                photo: '/images/agents/Suburbs/South Yarra - 3141/Belle Property/angela keenan.JPG',
                performance: {
                    propertiesLeased: 9,
                    medianLeasedPrice: 540
                }
            },
            {
                name: 'Jo Leonardis',
                position: 'Head of Property Management',
                phone: '0411 576 697',
                photo: '/images/agents/Suburbs/South Yarra - 3141/Belle Property/jo leonardis.JPG',
                performance: {
                    propertiesLeased: 15,
                    medianLeasedPrice: 620
                }
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