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

//post request that acquires user's address for processing.
app.post('/api',  async (request, response) => { // i declared this function as async for my own purpose when testing you may not need it if that's the case feel free to remove it

    // user address is found in request variable to access it the code is request.address
    //SQLITE3CODE STARTS HERE


    // feel free to delete this ******************const testee  = await address_to_latlong(request.body.urlz);
    //console.log("--------------------------");
    console.log(testee);




    //Please send hospital lat and long that needs to be displayed along with the lat and long 
    //of user input any other relevant information that gets displayed goes here aswell 
    response.json({
        //change this however is necessary nothing include in the braces is required the key names you remain constant though
        //you can also add any extra key&values you want to display on the map here then use the additions in the index file. 
        // if youre having any issues with making use of any added key&value pairs let me know and i can help out.
        status: "success", //key/value pairs need to be comma seperated
        //hLat: // hospital latitude value goes here
        //hLon: //hospital longitude value goes here
        //lat: //user input latitude goes here
        //lon: //user input lon goes here
    });

});

// convert user address to lat and long coordinates
async function address_to_latlong(address) {
        
    var latlong
    try{
      const response = await fetch('https://api.opencagedata.com/geocode/v1/json?q='+address+'&key=b0fd253b4b84485994275fdad6860620')
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      const json = await response.json()
      //console.log(json)
      if(json.status.code = 200){
        latlong = json.results[0].geometry
        //console.log(latlong)
        return(latlong)
      }else{
        latlong = "Unable to locate address."
        return(latlong)
      }
    }catch(error){
        console.log('There has been a problem with your fetch operation: ', error.message);
        latlong = 'There has been a problem with your fetch operation: ', error.message
        return(latlong)
    }
      
  }