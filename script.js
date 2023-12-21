    ymaps.ready(init);
    function init(){ 
        // Creating the map.    
        let myMap = new ymaps.Map("map", {
            // The map center coordinates.
            // Default order: «latitude, longitude».
            // To not manually determine the map center coordinates,
            // use the Coordinate detection tool.
            center: [55.76, 37.64],
            // Zoom level. Acceptable values:
            // from 0 (the entire world) to 19.
            zoom: 7
        });
    }
let button = document.querySelector(".btnSearch");

const ipValue = document.querySelector(".valueIp");
const countryValue = document.querySelector(".valueCountry");
const utcValue = document.querySelector(".valueUtc");
const ispValue = document.querySelector(".valueIsp");


function getInputValue(){
    let ipInput = document.querySelector("#ipaddress").value;
    const key = 'at_0iDoj4504blzc9hchqt0E6ogRuCgC';
    const url = 'https://geo.ipify.org/api/v1?apiKey='+key+'&ipAddress=';
    urlUpdated = url + ipInput

    console.log(ipInput);

    fetch(urlUpdated)
        .then(response => response.json())
        .then(response => updateValues(response))
        .catch(error => console.log(error));
}

function updateValues(response){
    ipValue.innerHTML = response.ip;
    
    countryValue.innerHTML = response.location.country+", "+response.location.region+", "+response.location.city+", "+response.location.postalCode;
    
    utcValue.innerHTML = "UTC"+response.location.timezone;

    ispValue.innerHTML = response.isp;

    createMap(response)
}

function createMap(response) {
    let latitude = response.location.lat
    let longitude = response.location.lng
    console.log("lat: " + latitude + ", lng: " + longitude)
    
    mapboxgl.accessToken = 'pk.eyJ1IjoibWJlbGx5ZG8iLCJhIjoiY2tqb2E1anFmMGx2djJ2bzhpeDRkdHFyayJ9.DEAvUgh9QjI7vbAWdxHeaw';
    let map = new mapboxgl.Map({     
        container: 'map',
        style: 'mapbox://styles/mbellydo/ckjoa9yng3mlm19oa7kf5o3cs', 
        center: [longitude, latitude], 
        zoom: 15
    });
    let marker = new mapboxgl.Marker({
        color: "#FFFFFF",
        draggable: true
        }).setLngLat([longitude, latitude])
        .addTo(map);
    map.addControl(new mapboxgl.NavigationControl());
    
    let layerList = document.getElementById('menu');
    let inputs = layerList.getElementsByTagName('input');
    
    function switchLayer(layer) {
        let layerId = layer.target.id;
        map.setStyle('mapbox://styles/mapbox/' + layerId);
    }
    
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].onclick = switchLayer;
    }
}