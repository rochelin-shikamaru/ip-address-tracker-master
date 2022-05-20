// configuration map

const map = L.map('map', {zoomControl: false} ).setView([0, 0], 2);

L.control.zoom({
    position:'bottomright'
}).addTo(map);
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, {attribution});

let myIcon = L.icon({
    iconUrl: './images/icon-location.svg',
    iconSize: [46, 95],
    iconAnchor: [22, 94]
});
tiles.addTo(map);

const marker = L.marker([0,0], {icon: myIcon}).addTo(map);
// handle

/// handleSearch
let ipAdress = 0;
const handleSearch = ()=>{

    const regex = /^([0-9]{1,3}\.){3}[0-9]{1,3}$/;
    ipAdress  = document.querySelector(".search__input").value;

    if(regex.test(ipAdress)){
        api();   
        document.querySelector(".search__input").value = "";
    }else{
        alert("invalid address");
    }
    
}

//call api on ipify

const api = async ()=>{
    try{
        const response = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_Z2xUDpuC3APsYeoUiaH0FCtS0XdJS&ipAddress=${ipAdress}`);
        const data = await response.json();
        console.log(data);
        marker.setLatLng([data.location.lat, data.location.lng])
        document.querySelector(".information__ip p").innerText = data.ip;
        document.querySelector(".information__location p").innerText = data.location.city; 
        document.querySelector(".information__timezone p").innerText = `UTC ${data.location.timezone}`;
        document.querySelector(".information__isp p").innerText = data.isp;
    }
    catch(err){
       console.log(err);
    }
}
api();