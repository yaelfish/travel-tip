'use strict';

function saveToStorage(key, value) {
    const str = JSON.stringify(value);
    localStorage.setItem(key, str);
}

function loadFromStorage(key, defaultValue) {
    let str = localStorage.getItem(key);
    return str ? JSON.parse(str) : defaultValue
}

function generateId() {
    const length = 5;
    let txt = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        txt += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return txt;
}


function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}