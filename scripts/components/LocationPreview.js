'use strict';

class LocationPreview {
    constructor(location) {
        this.location = location;
    }

    onUpdateLocation = () => {
        let askForNewLocation = +prompt('What to show?')
        updateLocation(this.location, askForNewLocation)
        renderLocationsList()
    }

    onDeleteLocation = () => {
        deleteMarker(this.location.id)
        renderLocationsList()
    }


    render() {
        const { location } = this;

        const elTr = document.createElement('tr');
        elTr.innerHTML = 
        `<td>${location.id}</td> 
        <td>${location.title}</td>
        <td class="weather-td">weather will be here</td>
        <td class="btns-td">
            <button class="update-row-btn">Update</button>
            <button class="delete-row-btn">Delete</button>
        </td>`

        elTr.querySelector('.update-row-btn').onclick = this.onUpdateLocation;
        elTr.querySelector('.delete-row-btn').onclick = this.onDeleteLocation;        
        return elTr;
    }
}
