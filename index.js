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
        name: "P Di Natale",
        address: "44 Watton St, Werribee VIC 3030",
        phone: "1300 997 553",
        lat: -37.8999,
        lng: 144.6611,
        medianLeasePrice: "450",
        medianDaysAdvertised: "23",
        propertiesLeased: "203",
        propertiesForRent: "26",
        medianSoldPrice: "600",
        medianDaysAdvertisedSales: "71",
        propertiesSold: "43",
        propertiesForSale: "11",
        staff: [
            {
                name: 'Paul Di Natale',
                position: 'Founder',
                phone: '1300 997 553',
                photo: '/images/agents/Suburbs/Werribee - 3030/Werribee Real Estate/Paul Di Natale.JPG'
            },
            {
                name: 'John Di Natale',
                position: 'Director',
                phone: '1300 997 553',
                photo: '/images/agents/Suburbs/Werribee - 3030/Werribee Real Estate/John Di Natale.JPG'
            },
            {
                name: 'Jodi Lacastro',
                position: 'General Manager/Licensed Estate Agent',
                phone: '0433 950 281',
                photo: '/images/agents/Suburbs/Werribee - 3030/Werribee Real Estate/Jodi Lacastro.JPG'
            },
            {
                name: 'Anthony Amanatidis',
                position: 'Property Manager',
                phone: '0437 877 044',
                photo: '/images/agents/Suburbs/Werribee - 3030/Werribee Real Estate/Anthony Amanatidis.jpg'
            },
            {
                name: 'Bianca Birnbauer',
                position: 'Property Manager',
                phone: '0432 908 661',
                photo: '/images/agents/Suburbs/Werribee - 3030/Werribee Real Estate/Bianca Birnbauer.png'
            },
            {
                name: 'Bianca Lixon',
                position: 'Head of Property Management/Licensed Estate Agent',
                phone: '0488 738 372',
                photo: '/images/agents/Suburbs/Werribee - 3030/Werribee Real Estate/Bianca Lixon.jpg'
            },
            {
                name: 'Blake O\'Neil',
                position: 'Property Manager',
                phone: '0468 354 570',
                photo: '/images/agents/Suburbs/Werribee - 3030/Werribee Real Estate/Blake O\'Neil.jpg'
            },
            {
                name: 'Charles Cipri',
                position: 'Senior Property Manager/Sales Executive Commercial',
                phone: '0407 549 796',
                photo: '/images/agents/Suburbs/Werribee - 3030/Werribee Real Estate/Charles Cipri.jpg'
            },
            {
                name: 'Craig Vilcins',
                position: 'Senior Sales Consultant/LEA/Auctioneer',
                phone: '0437 149 421',
                photo: '/images/agents/Suburbs/Werribee - 3030/Werribee Real Estate/Craig Vilcins.jpg'
            },
            {
                name: 'Dylan Cropley',
                position: 'Property Manager/Sales Consultant',
                phone: '0437 532 999',
                photo: '/images/agents/Suburbs/Werribee - 3030/Werribee Real Estate/Dylan Cropley.jpg'
            },
            {
                name: 'John J Di Natale',
                position: 'Business Development Manager and Sales Consultant',
                phone: '0433 129 731',
                photo: '/images/agents/Suburbs/Werribee - 3030/Werribee Real Estate/John J Di Natale.jpg'
            },
            {
                name: 'Karla Vella',
                position: 'Senior Property Manager',
                phone: '0412 378 429',
                photo: '/images/agents/Suburbs/Werribee - 3030/Werribee Real Estate/Karla Vella.jpg'
            },
            {
                name: 'Natalie Pyke',
                position: 'Property Manager',
                phone: '1300 997 553',
                photo: '/images/agents/Suburbs/Werribee - 3030/Werribee Real Estate/Natalie Pyke.jpg'
            },
            {
                name: 'Neha Sinha',
                position: 'Property Manager',
                phone: '1300 997 553',
                photo: '/images/agents/Suburbs/Werribee - 3030/Werribee Real Estate/Neha Sinha.jpg'
            },
            {
                name: 'Rachelle Rush',
                position: 'Property Manager',
                phone: '0425 726 498',
                photo: '/images/agents/Suburbs/Werribee - 3030/Werribee Real Estate/Rachelle Rush.png'
            },
            {
                name: 'Susana Maltaric',
                position: 'Commercial Leasing Manager',
                phone: '0429 795 036',
                photo: '/images/agents/Suburbs/Werribee - 3030/Werribee Real Estate/Susana Maltaric.jpg'
            },
            {
                name: 'Taleah Donnelly',
                position: 'Business Development Manager',
                phone: '1300 997 553',
                photo: '/images/agents/Suburbs/Werribee - 3030/Werribee Real Estate/Taleah Donnelly.jpg'
            },
            {
                name: 'Tania Mackenzie',
                position: 'Administration',
                phone: '0434 574 900',
                photo: '/images/agents/Suburbs/Werribee - 3030/Werribee Real Estate/Tania Mackenzie.jpg'
            }
        ]
    },
    {
        name: "Melcorp Real Estate",
        address: "477 Swanston St, Melbourne VIC 3000",
        phone: "03 9663 1117",
        lat: -37.809847,
        lng: 144.963168,
        medianLeasePrice: "675",
        medianDaysAdvertised: "21",
        propertiesLeased: "400",
        propertiesForRent: "29",
        medianSoldPrice: "485",
        medianDaysAdvertisedSales: "48.5",
        propertiesSold: "103",
        propertiesForSale: "53",
        staff: [
            {
                name: 'Mark Giuliano',
                position: 'Director - OIEC',
                phone: '0405 030 000',
                photo: '/images/agents/Suburbs/Melbourne - 3000/Melcorp/Mark Giuliano.jpg',
                performance: {
                    medianSoldPrice: "581",
                    medianDaysAdvertised: 120,
                    propertiesSoldLead: 0,
                    propertiesSoldSecondary: 2
                }
            },
            {
                name: 'Allison Osborne',
                position: 'Head of Department - Property Management',
                phone: '03 9663 1117',
                photo: '/images/agents/Suburbs/Melbourne - 3000/Melcorp/Allison Osborne.jpg'
            },
            {
                name: 'Anna Theo',
                position: 'Head of Department - Senior Property Manager',
                phone: '03 9659 3626',
                photo: '/images/agents/Suburbs/Melbourne - 3000/Melcorp/Anna Theo.jpg'
            },
            {
                name: 'Calvin Tan',
                position: 'Head of Department - Business Development Manager',
                phone: '03 9965 3651',
                photo: '/images/agents/Suburbs/Melbourne - 3000/Melcorp/Calvin Tan.jpg'
            },
            {
                name: 'Irena Davidovic',
                position: 'Commercial Property Manager',
                phone: '03 9965 3651 4238 3319',
                photo: '/images/agents/Suburbs/Melbourne - 3000/Melcorp/Irena Davidovic.jpg'
            },
            {
                name: 'Sergio Lopez',
                position: 'Head of Department - Senior Sales Executive',
                phone: '0404 659 330',
                photo: '/images/agents/Suburbs/Melbourne - 3000/Melcorp/Sergio Lopez.jpg',
                performance: {
                    medianSoldPrice: "730",
                    medianDaysAdvertised: "44",
                    propertiesSoldLead: "18",
                    propertiesSoldSecondary: "2"
                }
            },
            {
                name: 'Sophia Zhu',
                position: 'Senior Sales Executive & Licensed Estate Agent',
                phone: '0433 962 828',
                photo: '/images/agents/Suburbs/Melbourne - 3000/Melcorp/Sophia Zhu.jpg',
                performance: {
                    medianSoldPrice: "518",
                    medianDaysAdvertised: "44",
                    propertiesSoldLead: "36",
                    propertiesSoldSecondary: "0"
                }
            },
            {
                name: 'Rita Lin',
                position: 'Senior Sales Executive & Licensed Estate Agent',
                phone: '0410 603 667',
                photo: '/images/agents/Suburbs/Melbourne - 3000/Melcorp/Rita Lin.jpg',
                performance: {
                    medianSoldPrice: "503",
                    medianDaysAdvertised: "63",
                    propertiesSoldLead: "33",
                    propertiesSoldSecondary: "5"
                }
            },
            {
                name: 'Jarryd Hatfield',
                position: 'Senior Sales Executive',
                phone: '0452 337 803',
                photo: '/images/agents/Suburbs/Melbourne - 3000/Melcorp/Jarryd Hatfield.jpg',
                performance: {
                    medianSoldPrice: "434",
                    medianDaysAdvertised: "50",
                    propertiesSoldLead: "21",
                    propertiesSoldSecondary: "8"
                }
            },
            {
                name: 'Precy Peet',
                position: 'Sales Executive & Licensed Estate Agent',
                phone: '03 9663 1117',
                photo: '/images/agents/Suburbs/Melbourne - 3000/Melcorp/Precy Peet.jpg',
                performance: {
                    medianSoldPrice: "665",
                    medianDaysAdvertised: "41",
                    propertiesSoldLead: "6",
                    propertiesSoldSecondary: "1"
                }
            },
            {
                name: 'Jimmy Zhou',
                position: 'Senior Sales Executive',
                phone: '0433 570 970',
                photo: '/images/agents/Suburbs/Melbourne - 3000/Melcorp/Jimmy Zhou.jpg',
                performance: {
                    medianSoldPrice: "560",
                    medianDaysAdvertised: "61",
                    propertiesSoldLead: "24",
                    propertiesSoldSecondary: "2"
                }
            },
            {
                name: 'Mattia Pecorino',
                position: 'Senior Sales Executive',
                phone: '0437 012 738',
                photo: '/images/agents/Suburbs/Melbourne - 3000/Melcorp/Mattia Pecorino.jpg',
                performance: {
                    medianSoldPrice: "498",
                    medianDaysAdvertised: "36",
                    propertiesSoldLead: "13",
                    propertiesSoldSecondary: "9"
                }
            },
            {
                name: 'Matilda Ward',
                position: 'Sales Administrator',
                phone: '03 9663 1117',
                photo: '/images/agents/Suburbs/Melbourne - 3000/Melcorp/Matilda Ward.jpg'
            },
            {
                name: 'Kerri Gartshore',
                position: 'Team Leader',
                phone: '03 9663 1117',
                photo: '/images/agents/Suburbs/Melbourne - 3000/Melcorp/Kerri Gartshore.jpg'
            },
            {
                name: 'Trish Destito',
                position: 'Branch Manager Southbank & Senior Property Manager',
                phone: '03 9663 1117',
                photo: '/images/agents/Suburbs/Melbourne - 3000/Melcorp/Trish Destito.jpg'
            },
            {
                name: 'Deli Dinh',
                position: 'Senior Property Manager',
                phone: '03 9663 1117',
                photo: '/images/agents/Suburbs/Melbourne - 3000/Melcorp/Deli Dinh.jpg'
            },
            {
                name: 'Suzii Keay',
                position: 'Property Manager',
                phone: '03 9663 1117',
                photo: '/images/agents/Suburbs/Melbourne - 3000/Melcorp/Suzii Keay.jpg'
            },
            {
                name: 'Rita Gong',
                position: 'Property Manager',
                phone: '03 9663 1117',
                photo: '/images/agents/Suburbs/Melbourne - 3000/Melcorp/Rita Gong.jpg'
            },
            {
                name: 'Ash Rahman',
                position: 'Property Manager',
                phone: '03 9663 1117',
                photo: '/images/agents/Suburbs/Melbourne - 3000/Melcorp/Ash Rahman.jpg'
            },
            {
                name: 'Kang Ni',
                position: 'Property Manager',
                phone: '03 9663 1117',
                photo: '/images/agents/Suburbs/Melbourne - 3000/Melcorp/Kang Ni.jpg'
            },
            {
                name: 'Shenna Atmadja',
                position: 'Property Manager',
                phone: '03 9663 1117',
                photo: '/images/agents/Suburbs/Melbourne - 3000/Melcorp/Shenna Atmadja.jpg'
            },
            {
                name: 'Claudia Tanser',
                position: 'Property Manager',
                phone: '03 9663 1117',
                photo: '/images/agents/Suburbs/Melbourne - 3000/Melcorp/Claudia Tanser.jpg'
            },
            {
                name: 'Jordan Nunns',
                position: 'Property Executive',
                phone: '03 9663 1117',
                photo: '/images/agents/Suburbs/Melbourne - 3000/Melcorp/Jordan Nunns.jpg'
            },
            {
                name: 'Yana Jaruc',
                position: 'Property Manager',
                phone: '03 9663 1117',
                photo: '/images/agents/Suburbs/Melbourne - 3000/Melcorp/Yana Jaruc.jpg'
            },
            {
                name: 'Malcolm Gorringe',
                position: 'Property Manager',
                phone: '03 9663 1117',
                photo: '/images/agents/Suburbs/Melbourne - 3000/Melcorp/Malcolm Gorringe.jpg'
            },
            {
                name: 'Romina Alessi',
                position: 'Leasing Consultant',
                phone: '03 9663 1117',
                photo: '/images/agents/Suburbs/Melbourne - 3000/Melcorp/Romina Alessi.jpg'
            },
            {
                name: 'Diana Camacho',
                position: 'Leasing Consultant',
                phone: '03 9663 1117',
                photo: '/images/agents/Suburbs/Melbourne - 3000/Melcorp/Diana Camacho.jpg'
            },
            {
                name: 'Tanya Snell',
                position: 'Trust Accountant',
                phone: '03 9663 1117',
                photo: '/images/agents/Suburbs/Melbourne - 3000/Melcorp/Tanya Snell.jpg'
            },
            {
                name: 'Alicia Henderson',
                position: 'Accounts Administrator',
                phone: '03 9663 1117',
                photo: '/images/agents/Suburbs/Melbourne - 3000/Melcorp/Alicia Henderson.jpg'
            },
            {
                name: 'Helen Chen',
                position: 'Marketing Manager',
                phone: '03 9663 1117',
                photo: '/images/agents/Suburbs/Melbourne - 3000/Melcorp/Helen Chen.jpg'
            },
            {
                name: 'Malissa Sichampanakhone',
                position: 'Receptionist',
                phone: '03 9663 1117',
                photo: '/images/agents/Suburbs/Melbourne - 3000/Melcorp/Malissa Sichampanakhone.jpg'
            },
            {
                name: 'Kat Singsathit',
                position: 'Administration',
                phone: '03 9663 1117',
                photo: '/images/agents/Suburbs/Melbourne - 3000/Melcorp/Kat Singsathit.jpg'
            },
            {
                name: 'Lisa Johnson',
                position: 'Receptionist',
                phone: '03 9663 1117',
                photo: '/images/agents/Suburbs/Melbourne - 3000/Melcorp/Lisa Johnson.jpg'
            },
            {
                name: 'Rebecca Adrain',
                position: 'Receptionist',
                phone: '03 9663 1117',
                photo: '/images/agents/Suburbs/Melbourne - 3000/Melcorp/Rebecca Adrain.jpg'
            },
            {
                name: 'Maddi Lloyd',
                position: 'People and Culture Manager',
                phone: '03 9663 1117',
                photo: '/images/agents/Suburbs/Melbourne - 3000/Melcorp/Maddi Lloyd.jpg'
            }
        ]
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
        propertiesForRent: "76",
        staff: [
            {
                name: 'Heather Zhang',
                position: 'Group Compliance Manager - Property Management',
                phone: '0432 412 395',
                photo: '/images/agents/Suburbs/Melbourne - 3000/Vicprop/Heather Zhang.jpg'
            },
            {
                name: 'Jamie Fan',
                position: 'Sales Manager',
                phone: '0401 546 981',
                photo: '/images/agents/Suburbs/Melbourne - 3000/Vicprop/Jamie Fan.jpg'
            },
            {
                name: 'Serena Liu',
                position: 'Channel Sales Manager',
                phone: '0425 399 203',
                photo: '/images/agents/Suburbs/Melbourne - 3000/Vicprop/Serena Liu.jpg'
            },
            {
                name: 'Nora Li',
                position: 'Senior Sales Consultant',
                phone: '0433 631 968',
                photo: '/images/agents/Suburbs/Melbourne - 3000/Vicprop/Nora Li.jpg'
            },
            {
                name: 'Ann Xie',
                position: 'Sales Consultant',
                phone: '0450 129 588',
                photo: '/images/agents/Suburbs/Melbourne - 3000/Vicprop/Ann Xie.jpg'
            },
            {
                name: 'Ellie Cheng',
                position: 'Sales Consultant',
                phone: '0451 181 001',
                photo: '/images/agents/Suburbs/Melbourne - 3000/Vicprop/Ellie Cheng.jpg'
            },
            {
                name: 'James Yao',
                position: 'Sales Consultant',
                phone: '0450 681 716',
                photo: '/images/agents/Suburbs/Melbourne - 3000/Vicprop/James Yao.jpg'
            },
            {
                name: 'Mason Wong',
                position: 'Senior Property Manager',
                phone: '03 9602 1699',
                photo: '/images/agents/Suburbs/Melbourne - 3000/Vicprop/Mason Wong.jpg'
            },
            {
                name: 'Phoenix To',
                position: 'Assistant Property Manager',
                phone: '03 9602 1699',
                photo: '/images/agents/Suburbs/Melbourne - 3000/Vicprop/Phoenix To.jpg'
            },
            {
                name: 'Stanley Cheung',
                position: 'Leasing Consultant',
                phone: '0459 157 795',
                photo: '/images/agents/Suburbs/Melbourne - 3000/Vicprop/Stanley Cheung.jpg'
            },
            {
                name: 'Nora Xu',
                position: 'Sales Consultant',
                phone: '03 9602 1699',
                photo: '/images/agents/Suburbs/Melbourne - 3000/Vicprop/Nora Xu.jpg'
            },
            {
                name: 'Vincent Wu',
                position: 'Sales Consultant',
                phone: '03 9602 1699',
                photo: '/images/agents/Suburbs/Melbourne - 3000/Vicprop/Vincent Wu.jpg'
            },
            {
                name: 'Max Hou',
                position: 'Sales Consultant',
                phone: '03 9602 1699',
                photo: '/images/agents/Suburbs/Melbourne - 3000/Vicprop/Max Hou.jpg'
            }
        ]
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
        propertiesForRent: "42",
        staff: [
            {
                name: "Ada Taylor",
                position: "Senior Sales Consultant",
                phone: "0428 058 880",
                photo: "/images/agents/Suburbs/South Yarra - 3141/Kay & Burton/Ada Taylor.jpg",
                performance: {
                    medianSoldPrice: "2400",
                    medianDaysAdvertised: 28,
                    propertiesSoldLead: 6,
                    propertiesSoldSecondary: 16
                }
            },
            {
                name: "Adam Cashmore",
                position: "Senior Sales Consultant, Licensed Estate Agent",
                phone: "0407 077 113",
                photo: "/images/agents/Suburbs/South Yarra - 3141/Kay & Burton/Adam Cashmore.jpg",
                performance: {
                    medianSoldPrice: "1410",
                    medianDaysAdvertised: 25,
                    propertiesSoldLead: 18,
                    propertiesSoldSecondary: 3
                }
            },
            {
                name: "Adrian Wood",
                position: "Sales Consultant",
                phone: "0419 359 047",
                photo: "/images/agents/Suburbs/South Yarra - 3141/Kay & Burton/Adrian Wood.jpg",
                performance: {
                    medianSoldPrice: "1640",
                    medianDaysAdvertised: 32,
                    propertiesSoldLead: 10,
                    propertiesSoldSecondary: 6
                }
            },
            {
                name: "Alex Condon",
                position: "Assistant Sales Consultant",
                phone: "0421 494 810",
                photo: "/images/agents/Suburbs/South Yarra - 3141/Kay & Burton/Alex Condon.jpg",
                performance: {
                    medianSoldPrice: "1120",
                    medianDaysAdvertised: 25,
                    propertiesSoldLead: 11,
                    propertiesSoldSecondary: 13
                }
            },
            {
                name: "Alex Eggers",
                position: "Executive Assistant to Nicole Gleeson",
                phone: "0402 563 160",
                photo: "/images/agents/Suburbs/South Yarra - 3141/Kay & Burton/Alex Eggers.jpg"
            },
            {
                name: "Alex Schiavo",
                position: "Sales Consultant",
                phone: "0419 239 549",
                photo: "/images/agents/Suburbs/South Yarra - 3141/Kay & Burton/Alex Schiavo.jpg",
                performance: {
                    medianSoldPrice: "4000",
                    medianDaysAdvertised: 61,
                    propertiesSoldLead: 15,
                    propertiesSoldSecondary: 10
                }
            },
            {
                name: "Alexander Hamer-Taylor",
                position: "Sales Consultant",
                phone: "0437 949 252",
                photo: "/images/agents/Suburbs/South Yarra - 3141/Kay & Burton/Alexander Hamer-Taylor.jpg"
            },
            {
                name: "Anastasia Chessum",
                position: "Senior Property Manager",
                phone: "0475 770 115",
                photo: "/images/agents/Suburbs/South Yarra - 3141/Kay & Burton/Anastasia Chessum.jpg"
            },
            {
                name: "Andrew Hines",
                position: "Sales Consultant",
                phone: "0412 999 855",
                photo: "/images/agents/Suburbs/South Yarra - 3141/Kay & Burton/Andrew Hines.jpg"
            },
            {
                name: "Andrew Sahhar",
                position: "Director",
                phone: "0417 363 358",
                photo: "/images/agents/Suburbs/South Yarra - 3141/Kay & Burton/Andrew Sahhar.jpg",
                performance: {
                    medianSoldPrice: "4250",
                    medianDaysAdvertised: 35,
                    propertiesSoldLead: 15,
                    propertiesSoldSecondary: 2
                }
            },
            {
                name: "Arabella Houghton",
                position: "Assistant Sales Consultant",
                phone: "0435 756 455",
                photo: "/images/agents/Suburbs/South Yarra - 3141/Kay & Burton/Arabella Houghton.jpg",
                performance: {
                    medianSoldPrice: "680",
                    medianDaysAdvertised: 26,
                    propertiesSoldLead: 4,
                    propertiesSoldSecondary: 5
                }
            },
            {
                name: "Ben Hughes",
                position: "Sales Consultant",
                phone: "0431 462 919",
                photo: "/images/agents/Suburbs/South Yarra - 3141/Kay & Burton/Ben Hughes.jpg",
                performance: {
                    medianSoldPrice: "1090",
                    medianDaysAdvertised: 27,
                    propertiesSoldLead: 3,
                    propertiesSoldSecondary: 3
                }
            },
            {
                name: "Caleb Griffin",
                position: "Team Leader - Fully Furnished & Corporate Leasing",
                phone: "0427 552 729",
                photo: "/images/agents/Suburbs/South Yarra - 3141/Kay & Burton/Caleb Griffin.jpg"
            },
            {
                name: "Campbell Kilsby",
                position: "Sales Consultant",
                phone: "0423 248 620",
                photo: "/images/agents/Suburbs/South Yarra - 3141/Kay & Burton/Campbell Kilsby.jpg",
                performance: {
                    medianSoldPrice: "775",
                    medianDaysAdvertised: 28,
                    propertiesSoldLead: 16,
                    propertiesSoldSecondary: 8
                }
            },
            {
                name: "Carly Bramble",
                position: "Property Manager",
                phone: "0477 114 229",
                photo: "/images/agents/Suburbs/South Yarra - 3141/Kay & Burton/Carly Bramble.jpg"
            },
            {
                name: "Cath Stubbings",
                position: "Director of Property Management",
                phone: "03 9820 1111",
                photo: "/images/agents/Suburbs/South Yarra - 3141/Kay & Burton/Cath Stubbings.jpg"
            },
            {
                name: "Chelsi Ross",
                position: "Senior Property Manager",
                phone: "0417 679 205",
                photo: "/images/agents/Suburbs/South Yarra - 3141/Kay & Burton/Chelsi Ross.jpg"
            },
            {
                name: "Daisy Toogood",
                position: "Assistant Sales Consultant",
                phone: "0432 370 722",
                photo: "/images/agents/Suburbs/South Yarra - 3141/Kay & Burton/Daisy Toogood.jpg"
            },
            {
                name: "Damon Krongold",
                position: "Sales Consultant",
                phone: "0418 850 757",
                photo: "/images/agents/Suburbs/South Yarra - 3141/Kay & Burton/Damon Krongold.jpg"
            },
            {
                name: "Danielle Horne",
                position: "Sales Consultant & Executive Assistant",
                phone: "0467 955 367",
                photo: "/images/agents/Suburbs/South Yarra - 3141/Kay & Burton/Danielle Horne.jpg",
                performance: {
                    medianSoldPrice: "3400",
                    medianDaysAdvertised: 38,
                    propertiesSoldLead: 2,
                    propertiesSoldSecondary: 17
                }
            },
            {
                name: "Dario Fazio",
                position: "Sales Consultant",
                phone: "0452 241 398",
                photo: "/images/agents/Suburbs/South Yarra - 3141/Kay & Burton/Dario Fazio.jpg",
                performance: {
                    medianSoldPrice: "1200",
                    medianDaysAdvertised: 39,
                    propertiesSoldLead: 8,
                    propertiesSoldSecondary: 18
                }
            },
            {
                name: "Darren Lewenberg",
                position: "Director",
                phone: "0412 555 556",
                photo: "/images/agents/Suburbs/South Yarra - 3141/Kay & Burton/Darren Lewenberg.jpg",
                performance: {
                    medianSoldPrice: "2390",
                    medianDaysAdvertised: 33,
                    propertiesSoldLead: 15,
                    propertiesSoldSecondary: 13
                }
            },
            {
                name: "Darren McMullin",
                position: "Partner, New Business & Corporate Leasing",
                phone: "0433 826 737",
                photo: "/images/agents/Suburbs/South Yarra - 3141/Kay & Burton/Darren McMullin.jpg"
            },
            {
                name: "Debbie Davut",
                position: "Manager – Fully Furnished & Corporate Leasing",
                phone: "0438 051 274",
                photo: "/images/agents/Suburbs/South Yarra - 3141/Kay & Burton/Debbie Davut.jpg"
            },
            {
                name: "Dylan Archer",
                position: "Sales Consultant",
                phone: "0402 431 993",
                photo: "/images/agents/Suburbs/South Yarra - 3141/Kay & Burton/Dylan Archer.jpg"
            },
            {
                name: "Emily Wong",
                position: "Property Manager",
                phone: "0447 010 165",
                photo: "/images/agents/Suburbs/South Yarra - 3141/Kay & Burton/Emily Wong.jpg"
            },
            {
                name: "Emma Powis",
                position: "Property Manager",
                phone: "0428 747 595",
                photo: "/images/agents/Suburbs/South Yarra - 3141/Kay & Burton/Emma Powis.jpg"
            },
            {
                name: "Evelyne Surja",
                position: "Leasing & New Business Manager",
                phone: "0477 114 333",
                photo: "/images/agents/Suburbs/South Yarra - 3141/Kay & Burton/Evelyne Surja.jpg"
            },
            {
                name: "Felicity Fitzgerald",
                position: "Senior Property Manager",
                phone: "0477 477 314",
                photo: "/images/agents/Suburbs/South Yarra - 3141/Kay & Burton/Felicity Fitzgerald.jpg"
            },
            {
                name: "Gowan Stubbings",
                position: "Executive Director, Group Board Member",
                phone: "0412 269 999",
                photo: "/images/agents/Suburbs/South Yarra - 3141/Kay & Burton/Gowan Stubbings.jpg",
                performance: {
                    medianSoldPrice: "3350",
                    medianDaysAdvertised: 32,
                    propertiesSoldLead: 6,
                    propertiesSoldSecondary: 4
                }
            },
            {
                name: "Grant Samuel",
                position: "Director",
                phone: "0403 132 095",
                photo: "/images/agents/Suburbs/South Yarra - 3141/Kay & Burton/Grant Samuel.jpg",
                performance: {
                    medianSoldPrice: "2030",
                    medianDaysAdvertised: 33,
                    propertiesSoldLead: 14,
                    propertiesSoldSecondary: 18
                }
            },
            {
                name: "Liz Jensen",
                position: "Sales Consultant",
                phone: "0418 818 470",
                photo: "/images/agents/Suburbs/South Yarra - 3141/Kay & Burton/Liz Jensen.jpg"
            },
            {
                name: "Matthew Pillios",
                position: "Sales Consultant",
                phone: "0408 145 982",
                photo: "/images/agents/Suburbs/South Yarra - 3141/Kay & Burton/Matthew Pillios.jpg",
                performance: {
                    medianSoldPrice: "6830",
                    medianDaysAdvertised: 23,
                    propertiesSoldLead: 1,
                    propertiesSoldSecondary: 1
                }
            },
            {
                name: "Nick Kenyon",
                position: "Head of Luxury Strategy",
                phone: "0429 858 616",
                photo: "/images/agents/Suburbs/South Yarra - 3141/Kay & Burton/Nick Kenyon.jpg",
                performance: {
                    medianSoldPrice: "6970",
                    medianDaysAdvertised: 27,
                    propertiesSoldLead: 3,
                    propertiesSoldSecondary: 1
                }
            },
            {
                name: "Nicole Gleeson",
                position: "Director",
                phone: "0414 809 221",
                photo: "/images/agents/Suburbs/South Yarra - 3141/Kay & Burton/Nicole Gleeson.jpg",
                performance: {
                    medianSoldPrice: "2150",
                    medianDaysAdvertised: 29,
                    propertiesSoldLead: 16,
                    propertiesSoldSecondary: 11
                }
            },
            {
                name: "Nicky Rowe",
                position: "Sales Consultant",
                phone: "0428 640 509",
                photo: "/images/agents/Suburbs/South Yarra - 3141/Kay & Burton/Nicky Rowe.jpg",
                performance: {
                    medianSoldPrice: "1930",
                    medianDaysAdvertised: 26,
                    propertiesSoldLead: 5,
                    propertiesSoldSecondary: 15
                }
            },
            {
                name: "Oliver Booth",
                position: "Partner",
                phone: "0413 975 723",
                photo: "/images/agents/Suburbs/South Yarra - 3141/Kay & Burton/Oliver Booth.jpg",
                performance: {
                    medianSoldPrice: "2500",
                    medianDaysAdvertised: 29,
                    propertiesSoldLead: 12,
                    propertiesSoldSecondary: 13
                }
            },
            {
                name: "Peter Kudelka",
                position: "Executive Director",
                phone: "0418 319 439",
                photo: "/images/agents/Suburbs/South Yarra - 3141/Kay & Burton/Peter Kudelka.jpg",
                performance: {
                    medianSoldPrice: "2450",
                    medianDaysAdvertised: 32,
                    propertiesSoldLead: 6,
                    propertiesSoldSecondary: 3
                }
            },
            {
                name: "Philippa Leyland-Greaves",
                position: "Team Manager, Property Management",
                phone: "0477 110 134",
                photo: "/images/agents/Suburbs/South Yarra - 3141/Kay & Burton/Philippa Leyland-Greaves.jpg"
            },
            {
                name: "Rae Mano",
                position: "Senior Sales Consultant",
                phone: "0413 768 163",
                photo: "/images/agents/Suburbs/South Yarra - 3141/Kay & Burton/Rae Mano.jpg",
                performance: {
                    medianSoldPrice: "6000",
                    medianDaysAdvertised: 32,
                    propertiesSoldLead: 3,
                    propertiesSoldSecondary: 3
                }
            },
            {
                name: "Richard Nowak",
                position: "Senior Sales Consultant",
                phone: "0418 383 774",
                photo: "/images/agents/Suburbs/South Yarra - 3141/Kay & Burton/Richard Nowak.jpg",
                performance: {
                    medianSoldPrice: "860",
                    medianDaysAdvertised: 37,
                    propertiesSoldLead: 2,
                    propertiesSoldSecondary: 0
                }
            },
            {
                name: "Robert Li",
                position: "Senior International Relationship Manager",
                phone: "0413 725 369",
                photo: "/images/agents/Suburbs/South Yarra - 3141/Kay & Burton/Robert Li.jpg"
            },
            {
                name: "Ross Savas",
                position: "Managing Director",
                phone: "0418 322 994",
                photo: "/images/agents/Suburbs/South Yarra - 3141/Kay & Burton/Ross Savas.jpg",
                performance: {
                    medianSoldPrice: "9400",
                    medianDaysAdvertised: 55,
                    propertiesSoldLead: 1,
                    propertiesSoldSecondary: 6
                }
            },
            {
                name: "Stephanie Kovacevic",
                position: "Team Leader, Senior Property Manager",
                phone: "0427 709 802",
                photo: "/images/agents/Suburbs/South Yarra - 3141/Kay & Burton/Stephanie Kovacevic.jpg"
            },
            {
                name: "Thomas Foster",
                position: "Senior Property Manager & 2IC",
                phone: "0428 761 048",
                photo: "/images/agents/Suburbs/South Yarra - 3141/Kay & Burton/Thomas Foster.jpg"
            },
            {
                name: "Tim Blackett",
                position: "Licensed Estate Agent",
                phone: "0400 780 700",
                photo: "/images/agents/Suburbs/South Yarra - 3141/Kay & Burton/Tim Blackett.jpg"
            },
            {
                name: "Will Winter",
                position: "Sales Consultant",
                phone: "0408 509 644",
                photo: "/images/agents/Suburbs/South Yarra - 3141/Kay & Burton/Will Winter.jpg"
            },
            {
                name: "Zac Muller",
                position: "Operations Manager, Property Management",
                phone: "0472 623 399",
                photo: "/images/agents/Suburbs/South Yarra - 3141/Kay & Burton/Zac Muller.jpg"
            },
            {
                name: "Zoe Westaway",
                position: "Administrative Assistant",
                phone: "0427 853 885",
                photo: "/images/agents/Suburbs/South Yarra - 3141/Kay & Burton/Zoe Westaway.jpg"
            },
            {
                name: "Rebecca Edwards",
                position: "Sales Consultant",
                phone: "03 9820 1111",
                photo: "/images/agents/Suburbs/South Yarra - 3141/Kay & Burton/Rebecca Edwards.jpg",
                performance: {
                    medianSoldPrice: "2300",
                    medianDaysAdvertised: 24,
                    propertiesSoldLead: 10,
                    propertiesSoldSecondary: 7
                }
            },
            {
                name: "Richard Nowak",
                position: "Sales Consultant",
                phone: "03 9820 1111",
                photo: "/images/agents/Suburbs/South Yarra - 3141/Kay & Burton/Richard Nowak.jpg",
                performance: {
                    medianSoldPrice: "860",
                    medianDaysAdvertised: 37,
                    propertiesSoldLead: 2,
                    propertiesSoldSecondary: 0
                }
            },
            {
                name: "Robert Li",
                position: "Sales Consultant",
                phone: "03 9820 1111",
                photo: "/images/agents/Suburbs/South Yarra - 3141/Kay & Burton/Robert Li.jpg",
                performance: {
                    medianSoldPrice: "6130",
                    medianDaysAdvertised: 9,
                    propertiesSoldLead: 0,
                    propertiesSoldSecondary: 1
                }
            },
            {
                name: "Sam Wilkinson",
                position: "Sales Consultant",
                phone: "03 9820 1111",
                photo: "/images/agents/Suburbs/South Yarra - 3141/Kay & Burton/Sam Wilkinson.jpg",
                performance: {
                    medianSoldPrice: "6300",
                    medianDaysAdvertised: 29,
                    propertiesSoldLead: 15,
                    propertiesSoldSecondary: 3
                }
            },
            {
                name: "Tim Blackett",
                position: "Sales Consultant",
                phone: "03 9820 1111",
                photo: "/images/agents/Suburbs/South Yarra - 3141/Kay & Burton/Tim Blackett.jpg",
                performance: {
                    medianSoldPrice: "1700",
                    medianDaysAdvertised: 68,
                    propertiesSoldLead: 13,
                    propertiesSoldSecondary: 4
                }
            },
            {
                name: "Tom Staughton",
                position: "Sales Consultant",
                phone: "03 9820 1111",
                photo: "/images/agents/Suburbs/South Yarra - 3141/Kay & Burton/Tom Staughton.jpg",
                performance: {
                    medianSoldPrice: "2160",
                    medianDaysAdvertised: 33,
                    propertiesSoldLead: 10,
                    propertiesSoldSecondary: 21
                }
            },
            {
                name: "Tony Ryan",
                position: "Sales Consultant",
                phone: "03 9820 1111",
                photo: "/images/agents/Suburbs/South Yarra - 3141/Kay & Burton/Tony Ryan.jpg",
                performance: {
                    medianSoldPrice: "1210",
                    medianDaysAdvertised: 43,
                    propertiesSoldLead: 8,
                    propertiesSoldSecondary: 15
                }
            },
            {
                name: "Walter Dodich",
                position: "Sales Consultant",
                phone: "03 9820 1111",
                photo: "/images/agents/Suburbs/South Yarra - 3141/Kay & Burton/Walter Dodich.jpg",
                performance: {
                    medianSoldPrice: "2280",
                    medianDaysAdvertised: 27,
                    propertiesSoldLead: 25,
                    propertiesSoldSecondary: 9
                }
            },
            {
                name: "Will Winter",
                position: "Sales Consultant",
                phone: "03 9820 1111",
                photo: "/images/agents/Suburbs/South Yarra - 3141/Kay & Burton/Will Winter.jpg",
                performance: {
                    medianSoldPrice: "1200",
                    medianDaysAdvertised: 39,
                    propertiesSoldLead: 11,
                    propertiesSoldSecondary: 12
                }
            },
            {
                name: "Zen Agnew",
                position: "Sales Consultant",
                phone: "03 9820 1111",
                photo: "/images/agents/Suburbs/South Yarra - 3141/Kay & Burton/Zen Agnew.jpg",
                performance: {
                    medianSoldPrice: "1250",
                    medianDaysAdvertised: 46,
                    propertiesSoldLead: 5,
                    propertiesSoldSecondary: 8
                }
            },
            {
                name: "Scott Patterson",
                position: "Director",
                phone: "0417 581 074",
                photo: "/images/agents/Suburbs/South Yarra - 3141/Kay & Burton/Scott Patterson.jpg",
                performance: {
                    medianSoldPrice: "3790",
                    medianDaysAdvertised: 30,
                    propertiesSoldLead: 25,
                    propertiesSoldSecondary: 39
                }
            },
            {
                name: "Sophie Su",
                position: "Sales Consultant",
                phone: "0433 123 456",
                photo: "/images/agents/Suburbs/South Yarra - 3141/Kay & Burton/Sophie Su.jpg",
                performance: {
                    medianSoldPrice: "3600",
                    medianDaysAdvertised: 30,
                    propertiesSoldLead: 56,
                    propertiesSoldSecondary: 5
                }
            }
        ]
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
                position: 'Principal',
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
                    propertiesLeased: 8,
                    medianLeasedPrice: 495
                }
            },
            {
                name: 'Jason Tan',
                position: 'Property Management Assistant',
                phone: '0425 853 259',
                photo: '/images/agents/Suburbs/South Yarra - 3141/Belle Property/jason tan.jpg',
                performance: {
                    propertiesLeased: 31,
                    medianLeasedPrice: 600
                }
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
                photo: '/images/agents/Suburbs/South Yarra - 3141/Belle Property/sam landale.jpg',
                performance: {
                    propertiesLeased: 327,
                    medianLeasedPrice: 600
                }
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
                photo: '/images/agents/Suburbs/South Yarra - 3141/Belle Property/todd george.jpg',
                performance: {
                    propertiesLeased: 48,
                    medianLeasedPrice: 620
                }
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