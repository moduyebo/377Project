const express = require('express');
const fetch = require('node-fetch');
const sqlite3 = require('sqlite3').verbose(); 

const app = express();
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Starting server at ${port}`);
});

app.use(express.static('public'));

//app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/* 1. Initialize a function for when user input is taken in...
    1.1 run the fetch.js
    1.2 query database for hospital locations
    1.3 run address_to_latlong function
    1.4 create for loop to run latlong_distance function 
        1.4.1 store distance values in an array
    1.5 loop through distance array & select least value
    1.6 query database for record with geolocation value relating to shortest distance
*/ 
