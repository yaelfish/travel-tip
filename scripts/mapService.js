'use strict';

const KEY_MARKERS = 'markers';
let gCurrUserPos = null;
let gMarkedLocations = [];
let gPlaceId = 0;
let nextId;


function loadMarks() {
    gMarkedLocations = loadFromStorage(KEY_MARKERS)
    if (!gMarkedLocations) {
        gMarkedLocations = [];
    }
}

function getLocationsToRender() {
    return gMarkedLocations;
}

function createPlace(lat, lng, title) {
    let place = {
        id: gPlaceId++,
        lat: lat.toString(),
        lng: lng.toString(),
        title
    }
    gMarkedLocations.unshift(place)
    saveToStorage(KEY_MARKERS, gMarkedLocations);

}

function deleteMarker(markerId) {
    let idx = findMarkerIndexById(markerId);
    gMarkedLocations.splice(idx, 1);
    saveToStorage(KEY_MARKERS, gMarkedLocations)
}

function getMarkerById(markerId) {
    gMarkedLocations.forEach(function (marker) {
        if (marker.id === markerId) return marker;
    });
}

function findMarkerIndexById(markerId) {
    return gMarkedLocations.findIndex(function (marker) {
        return marker.id === markerId
    });
}

function getPosition() {
    if (!navigator.geolocation) {
        alert("HTML5 Geolocation is not supported in your browser.");
        return;
    }
    navigator.geolocation.getCurrentPosition(showLocation, handleLocationError);
}

function showLocation(position) {
    console.log(position);
    gCurrUserPos = { lat: position.coords.latitude, lng: position.coords.longitude }
    initMap({ lat: gCurrUserPos.lat, lng: gCurrUserPos.lng })
    createPlace(position.coords.latitude, position.coords.longitude, 'this will be my location');
}

function handleLocationError(error) {
    const locationError = document.querySelector("#locationError");

    switch (error.code) {
        case 0:
            locationError.innerHTML = "There was an error while retrieving your location: " + error.message;
            break;
        case 1:
            locationError.innerHTML = "The user didn't allow this page to retrieve a location.";
            break;
        case 2:
            locationError.innerHTML = "The browser was unable to determine your location: " + error.message;
            break;
        case 3:
            locationError.innerHTML = "The browser timed out before retrieving the location.";
            break;
    }
}