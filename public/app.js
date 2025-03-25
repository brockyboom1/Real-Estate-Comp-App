/**
 * Real Estate Agency Map Application
 * 
 * This JavaScript file handles the interactive map display and
 * data management for the real estate agency map application.
 */

// Global variables
let map;
let markers = [];
let infoWindow;
let agencies = [];
let currentAgency = null;

// DOM Elements
const agencyTypeSelect = document.getElementById('agency-type');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const agencyListElement = document.getElementById('agency-list');
const agencyDetailsElement = document.getElementById('agency-details');
const agencyListLoadingElement = document.getElementById('agency-list-loading');

// Templates
const agencyListItemTemplate = document.getElementById('agency-list-item-template');
const agencyDetailsTemplate = document.getElementById('agency-details-template');
const staffItemTemplate = document.getElementById('staff-item-template');

// Initialize the application when the page loads
document.addEventListener('DOMContentLoaded', () => {
  initializeMap();
  loadAgencies();
  setupEventListeners();
});

// Initialize Google Map
function initializeMap() {
  // Create map centered on Australia
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: -37.8136, lng: 144.9631 }, // Melbourne, Australia
    zoom: 12,
    styles: [
      {
        featureType: 'poi',
        elementType: 'labels',
        stylers: [{ visibility: 'off' }]
      }
    ]
  });

  // Create single info window to be reused for markers
  infoWindow = new google.maps.InfoWindow();

  // Close info window when clicking elsewhere on the map
  map.addListener('click', () => {
    infoWindow.close();
  });
}

// Setup event listeners for UI interactions
function setupEventListeners() {
  // Filter agencies by type
  agencyTypeSelect.addEventListener('change', filterAgencies);

  // Search functionality
  searchButton.addEventListener('click', searchAgencies);
  searchInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
      searchAgencies();
    }
  });
}

// Load agencies data from API
async function loadAgencies() {
  try {
    const response = await fetch('/api/agencies');
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    agencies = await response.json();
    
    // Hide loading indicator
    agencyListLoadingElement.style.display = 'none';
    
    // Render agencies
    renderAgencyList(agencies);
    createMarkers(agencies);
    
    // If no agencies found, show message
    if (agencies.length === 0) {
      agencyListElement.innerHTML = '<div class="placeholder"><p>No agencies found. Run the scraper first by executing "npm run scrape".</p></div>';
    }
  } catch (error) {
    console.error('Error loading agencies:', error);
    agencyListLoadingElement.style.display = 'none';
    agencyListElement.innerHTML = `<div class="placeholder"><p>Error loading agencies: ${error.message}</p></div>`;
  }
}

// Render agency list in sidebar
function renderAgencyList(agenciesToRender) {
  // Clear existing list
  while (agencyListElement.firstChild) {
    if (agencyListElement.firstChild !== agencyListLoadingElement) {
      agencyListElement.removeChild(agencyListElement.firstChild);
    }
  }
  
  // Render each agency
  agenciesToRender.forEach(agency => {
    const listItem = document.importNode(agencyListItemTemplate.content, true);
    
    // Fill in the details
    listItem.querySelector('.agency-name').textContent = agency.name;
    listItem.querySelector('.agency-address').textContent = agency.address;
    
    const agencyTypeElement = listItem.querySelector('.agency-type');
    agencyTypeElement.textContent = agency.type;
    agencyTypeElement.setAttribute('data-type', agency.type);
    
    listItem.querySelector('.agency-staff-count').textContent = `${agency.staffCount} staff`;
    
    // Set the agency ID and active state
    const listItemElement = listItem.querySelector('.agency-list-item');
    listItemElement.setAttribute('data-agency-id', agency.id);
    
    if (currentAgency && currentAgency.id === agency.id) {
      listItemElement.classList.add('active');
    }
    
    // Add click event to view agency details
    listItemElement.addEventListener('click', () => {
      selectAgency(agency);
    });
    
    // Add to the list
    agencyListElement.appendChild(listItem);
  });
}

// Create map markers for agencies
function createMarkers(agenciesToMark) {
  // Clear existing markers
  clearMarkers();
  
  // Add markers for each agency
  agenciesToMark.forEach(agency => {
    // Skip if no coordinates
    if (!agency.latitude || !agency.longitude) {
      return;
    }
    
    // Create marker
    const marker = new google.maps.Marker({
      position: { lat: agency.latitude, lng: agency.longitude },
      map: map,
      title: agency.name,
      icon: getMarkerIcon(agency.type)
    });
    
    // Add click event to marker
    marker.addListener('click', () => {
      // Open info window
      const content = `
        <div class="map-info-window">
          <h4>${agency.name}</h4>
          <p>${agency.address}</p>
          <p>${agency.staffCount} staff</p>
          <a href="#" id="view-details">View Details</a>
        </div>
      `;
      
      infoWindow.setContent(content);
      infoWindow.open(map, marker);
      
      // Add click event to "View Details" link after info window is opened
      setTimeout(() => {
        const viewDetailsLink = document.getElementById('view-details');
        if (viewDetailsLink) {
          viewDetailsLink.addEventListener('click', (event) => {
            event.preventDefault();
            selectAgency(agency);
            infoWindow.close();
          });
        }
      }, 10);
    });
    
    // Store marker
    markers.push({
      marker,
      agencyId: agency.id,
      agencyType: agency.type
    });
  });
  
  // Fit map to show all markers
  if (markers.length > 0) {
    const bounds = new google.maps.LatLngBounds();
    markers.forEach(item => bounds.extend(item.marker.getPosition()));
    map.fitBounds(bounds);
  }
}

// Get marker icon based on agency type
function getMarkerIcon(agencyType) {
  // Base marker style
  const baseIcon = {
    path: google.maps.SymbolPath.CIRCLE,
    fillOpacity: 1,
    strokeWeight: 1.5,
    strokeColor: '#FFFFFF',
    scale: 10
  };
  
  // Customize color based on agency type
  switch (agencyType) {
    case 'Belle Property':
      return {
        ...baseIcon,
        fillColor: '#e74c3c'
      };
    case 'Jellis Craig':
      return {
        ...baseIcon,
        fillColor: '#3498db'
      };
    case 'Biggin Scott':
      return {
        ...baseIcon,
        fillColor: '#2ecc71'
      };
    default:
      return {
        ...baseIcon,
        fillColor: '#95a5a6'
      };
  }
}

// Clear all markers from the map
function clearMarkers() {
  markers.forEach(item => item.marker.setMap(null));
  markers = [];
}

// Filter agencies by selected type
function filterAgencies() {
  const selectedType = agencyTypeSelect.value;
  
  let filteredAgencies = agencies;
  
  if (selectedType !== 'all') {
    filteredAgencies = agencies.filter(agency => agency.type === selectedType);
  }
  
  // Update UI
  renderAgencyList(filteredAgencies);
  
  // Update markers - hide/show based on filter
  markers.forEach(item => {
    const isVisible = selectedType === 'all' || item.agencyType === selectedType;
    item.marker.setVisible(isVisible);
  });
}

// Search agencies by name or suburb
function searchAgencies() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  
  if (!searchTerm) {
    // If search is empty, show all agencies (with type filter still applied)
    filterAgencies();
    return;
  }
  
  // Filter by both search term and selected type
  const selectedType = agencyTypeSelect.value;
  
  let filteredAgencies = agencies.filter(agency => 
    (agency.name.toLowerCase().includes(searchTerm) || 
     agency.suburb.toLowerCase().includes(searchTerm)) &&
    (selectedType === 'all' || agency.type === selectedType)
  );
  
  // Update UI
  renderAgencyList(filteredAgencies);
  
  // Update markers - hide/show based on search results
  markers.forEach(item => {
    const matchingAgency = filteredAgencies.find(agency => agency.id === item.agencyId);
    item.marker.setVisible(!!matchingAgency);
  });
}

// Select and display agency details
function selectAgency(agency) {
  // Update current agency
  currentAgency = agency;
  
  // Update active state in list
  document.querySelectorAll('.agency-list-item').forEach(item => {
    if (item.getAttribute('data-agency-id') === agency.id) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
  
  // Center map on selected agency
  if (agency.latitude && agency.longitude) {
    map.setCenter({ lat: agency.latitude, lng: agency.longitude });
    map.setZoom(15);
    
    // Find and bounce the marker
    const markerItem = markers.find(item => item.agencyId === agency.id);
    if (markerItem) {
      markerItem.marker.setAnimation(google.maps.Animation.BOUNCE);
      setTimeout(() => {
        markerItem.marker.setAnimation(null);
      }, 1500);
    }
  }
  
  // Render agency details
  renderAgencyDetails(agency);
  
  // Load agency staff
  loadAgencyStaff(agency.id);
}

// Render agency details in sidebar
function renderAgencyDetails(agency) {
  // Clear existing details
  agencyDetailsElement.innerHTML = '';
  
  // Clone template
  const details = document.importNode(agencyDetailsTemplate.content, true);
  
  // Fill in the details
  details.querySelector('.agency-name').textContent = agency.name;
  
  const agencyTypeElement = details.querySelector('.agency-type');
  agencyTypeElement.textContent = agency.type;
  
  const logoElement = details.querySelector('.agency-logo');
  if (agency.logoUrl) {
    logoElement.src = agency.logoUrl;
    logoElement.alt = `${agency.name} logo`;
  } else {
    // Use placeholder with colored background based on agency type
    logoElement.src = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%3E%3C%2Fsvg%3E';
    logoElement.alt = '';
    logoElement.setAttribute('data-type', agency.type);
  }
  
  details.querySelector('.agency-address').textContent = agency.address;

  const phoneElement = details.querySelector('.agency-phone');
  if (agency.phone) {
    phoneElement.textContent = agency.phone;
  } else {
    phoneElement.remove();
  }
  
  const emailElement = details.querySelector('.agency-email');
  if (agency.email) {
    emailElement.textContent = agency.email;
  } else {
    emailElement.remove();
  }
  
  const websiteElement = details.querySelector('.agency-website');
  if (agency.website) {
    websiteElement.href = agency.website;
  } else {
    websiteElement.parentElement.remove();
  }
  
  details.querySelector('.staff-count').textContent = agency.staffCount;
  
  // Add to the DOM
  agencyDetailsElement.appendChild(details);
}

// Load staff data for a specific agency
async function loadAgencyStaff(agencyId) {
  try {
    // Show loading indicator
    const staffLoadingElement = document.getElementById('staff-loading');
    staffLoadingElement.style.display = 'flex';
    
    // Clear existing staff
    const staffGridElement = document.querySelector('.staff-grid');
    staffGridElement.innerHTML = '';
    
    // Fetch staff data
    const response = await fetch(`/api/agencies/${agencyId}/agents`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const staff = await response.json();
    
    // Hide loading indicator
    staffLoadingElement.style.display = 'none';
    
    // Render staff
    renderStaff(staff);
  } catch (error) {
    console.error('Error loading staff:', error);
    document.getElementById('staff-loading').style.display = 'none';
    document.querySelector('.staff-grid').innerHTML = `<p>Error loading staff: ${error.message}</p>`;
  }
}

// Render staff members in agency details
function renderStaff(staffMembers) {
  const staffGridElement = document.querySelector('.staff-grid');
  
  // Clear existing staff
  staffGridElement.innerHTML = '';
  
  // If no staff members, show message
  if (staffMembers.length === 0) {
    staffGridElement.innerHTML = '<p>No staff information available</p>';
    return;
  }
  
  // Render each staff member
  staffMembers.forEach(staff => {
    const staffItem = document.importNode(staffItemTemplate.content, true);
    
    // Fill in the details
    staffItem.querySelector('.staff-name').textContent = staff.name;
    
    const positionElement = staffItem.querySelector('.staff-position');
    if (staff.position) {
      positionElement.textContent = staff.position;
    } else {
      positionElement.remove();
    }
    
    const photoElement = staffItem.querySelector('.staff-photo');
    if (staff.imageUrl) {
      photoElement.src = staff.imageUrl;
      photoElement.alt = `${staff.name}`;
    } else {
      photoElement.src = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22140%22%20height%3D%22120%22%20viewBox%3D%220%200%20140%20120%22%3E%3C%2Fsvg%3E';
      photoElement.alt = '';
    }
    
    const phoneElement = staffItem.querySelector('.staff-phone');
    if (staff.phone) {
      phoneElement.href = `tel:${staff.phone}`;
      phoneElement.textContent = 'Call';
    } else {
      phoneElement.remove();
    }
    
    const emailElement = staffItem.querySelector('.staff-email');
    if (staff.email) {
      emailElement.href = `mailto:${staff.email}`;
      emailElement.textContent = 'Email';
    } else {
      emailElement.remove();
    }
    
    // Add to the grid
    staffGridElement.appendChild(staffItem);
  });
}