'use strict';

let map;

function onMapReady() {
    console.log('map is ready');
    loadMarks();
    initMap();
    renderLocationsList();
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}
function showPosition(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    map.setCenter(new google.maps.LatLng(lat, lng));
}

function initMap(coords) {
    map = new google.maps.Map(document.getElementById('map'), {
        center: coords,
        zoom: 17
    });

    google.maps.event.addListener(map, 'click', function (event) {
        let marker = new google.maps.Marker({
            position: event.latLng,
            map: map,
            center: event.latLng,
            title: onCreateTitle()
        });

        let lat = '' + event.latLng.lat();
        let lng = '' + event.latLng.lng();

        createPlace(lat, lng, marker.title);
        
        renderLocationsList()
    });
}

function renderLocationsList() {
    let locations = getLocationsToRender();

    let elTbody = document.querySelector('.place-list');
    elTbody.innerHTML = '';
    locations.forEach((location) => {
        const locationPreview = new LocationPreview(location);
        const elTr = locationPreview.render();
        elTbody.appendChild(elTr);
    });
}

function onAddCurrLocation() {
    getPosition();
    initMap(); // setCenter() to avoid re-creating a new map.
    renderLocationsList();
    let lat = gCurrUserPos.lat;
    let lng = gCurrUserPos.lng;
    // return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyBVpwpbYfyZdyiQ6VvNwpEFKlelM35SYIg&callback=onMapReady`)
    //     .then((response) => {
    //         console.log(response);
    //         let title = response.data.results[0].formatted_address;
    //         document.querySelector('.display-location span').innerText = title;
    //     }).catch(err => {
    //         console.error(err);
    //     })     
} 

function onUserLocationSearch() {
    let inputSearched = document.querySelector('#location-searched').value;
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${inputSearched}&key=AIzaSyBVpwpbYfyZdyiQ6VvNwpEFKlelM35SYIg&callback=onMapReady`)
    .then((response) => {
        console.log(response);
        let title = response.data.results[0].formatted_address;
        let lat = response.data.results[0].geometry.location.lat;
        let lng = response.data.results[0].geometry.location.lng;
        createPlace(lat, lng, title);
        initMap(response.data.results[0].geometry.location); // setCenter() to avoid re-creating a new map.
        document.querySelector('.display-location span').innerText = title;
        renderLocationsList();
        // let { data } = response
    }).catch(err => {
        console.error(err);
    })     
}

function onCreateTitle() {
    let title = prompt('What is the title of this mark?');
    renderLocationsList();
    return title;
}

function onCopyToClipboard() {
    /* Get the text field */
    let copyText = document.querySelector('.display-location span').innerText;

    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /*For mobile devices*/

    /* Copy the text inside the text field */
    document.execCommand("copy");

    /* Alert the copied text */
    alert("Copied the text: " + copyText.value);
}



