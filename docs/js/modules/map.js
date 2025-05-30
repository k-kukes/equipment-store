import { fetchData } from "./fetchWrapper.js";

export async function initLeafletMap() {
    console.log("Initializing the map...");
    // 1) Init.: Instantiate the leaflet map object.
    const map = L.map('leafletMap').setView([45.5029, -73.5677], 10);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    // L.marker([45.52143963844733, -73.69168736978523]).addTo(map)
    // .bindPopup('Hartenstein Park soccer field.')
    // .openPopup();

    // 2) Fetch the content of the places.json using the Fetch API (AJAX)
    const placesUri = "data/places.json"
    const locations = await fetchData(placesUri);
   console.log(locations.categories);
   console.log(locations.places);

    // Process the locations.
   renderLocations(map, locations);

   const searchBar = document.getElementById('mapSearchbar');
   searchBar.addEventListener('keypress', ()=>{
    const searchKeyword = searchBar.value;
    const mapSearchList = document.getElementById('locationSearchList');
    const listItems = mapSearchList.childNodes;
    listItems.forEach(mapItem => {
        if (mapItem.textContent.toLowerCase().includes(searchKeyword.toLowerCase())) {
            mapItem.style.display = "block";
        } else {
            mapItem.style.display = "none";
        }
    })
   })
}

function renderLocations(map, locations){
    // 3) Loop over the locations.places array, and for each place, create a marker object and add it to the map.
   // The marker needs to be populated with its corresponding place info: the address, the name, the description
    locations.places.forEach(place => {
        const category = locations.categories.find(category => category.id === place.categoryId);

        var myIcon = L.icon({
            iconUrl: category.markerIcon,
            iconSize : [40,50],
            iconAnchor : [22,94],
            popupAnchor : [-3, -76]
        })
        
        var coord = place.point.coordinates.split(',');
        const placeInfo = `
        <p> <strong> ${place.name}</strong></p>
        <p> ${place.description}</p>
        <p> ${place.address}</p>
        `
        var markerPopup = L.marker(coord, {icon : myIcon}).addTo(map)
        .bindPopup(placeInfo);

        var itemDisplay = document.createElement('button');
        itemDisplay.textContent = place.name;
        itemDisplay.className = "btn btn-light";
        itemDisplay.style.width = '100%';
        
        itemDisplay.addEventListener('click', ()=> {
            map.setView(coord, 15);
            markerPopup.openPopup();
        })

        const mapSearchList = document.getElementById('locationSearchList');
        mapSearchList.appendChild(itemDisplay);
    });
}