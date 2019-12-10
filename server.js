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
app.post('/api',  async (request, response) => {
    // i declared this function as async for my own purpose when testing you may not need it 
    //if that's the case feel free to remove it
    const addy = response.req.body.address;
    userLoc = await address_to_latlong(addy);
    var answer = await loadData(userLoc);


    async function loadData(user){
      const apiURL = 'https://data.princegeorgescountymd.gov/resource/9r2z-mnpp.json'
        fetch(apiURL)
            .then(r => r.json())
            .then(data => data.map(a => ({name: a.facility_name, latitude: a.address.latitude, 
                longitude: a.address.longitude, address: a.address.human_address, telephone: a.telephone,
                web: a.website})))
            .then(data => {
              //console.log(data);
              var lowest = 100000000000000000000000;
              var hold;
              for (i = 0; i < data.length; i++){
                var temp = latlong_distance({lat: user.lat, lng: user.lng}, {lat: data[i].latitude, lng: data[i].longitude});
                if (temp < lowest){
                  lowest = temp;
                  hold = data[i];
                }
              }
              return {dist: lowest, hosp: hold};
                    })
            .then(res => {
              //console.log("0000000000000000000000000000000000000000000000000000\n",res.hosp.address.address, res.hos.name);
              var temp = res.hosp.address;
              response.json({
                status: "success",
                lat: userLoc.lat,
                lng: userLoc.lng,
                dist: res.dist,//change this however is necessary nothing include in the braces is required the key names you remain constant though
                hLat: res.hosp.latitude,
                hLon: res.hosp.longitude,
                hospName: res.hosp.name,
                hospTele: res.hosp.telephone,
                hospWeb: res.hosp.website
            });
                  })
    
    }

                      });

async function loadData(user){
  const apiURL = 'https://data.princegeorgescountymd.gov/resource/9r2z-mnpp.json'
    fetch(apiURL)
        .then(r => r.json())
        .then(data => data.map(a => ({name: a.facility_name, latitude: a.address.latitude, 
            longitude: a.address.longitude, address: a.address.human_address, telephone: a.telephone,
            web: a.website})))
        .then(data => {
          console.log(data);
          var lowest = 100000000000000000000000;
          var hold;
          for (i = 0; i < data.length; i++){
            var temp = latlong_distance({lat: user.lat, lng: user.lng}, {lat: data[i].latitude, lng: data[i].longitude});
            if (temp < lowest){
              lowest = temp;
              hold = data[i];
            }
          }
          return {dist: lowest, hosp: hold};
                })
        .then(res => {
          response.json({
            status: "success",
            lat: userLoc.lat,
            lng: userLoc.lng,
            dist: answer.dist,//change this however is necessary nothing include in the braces is required the key names you remain constant though
            hLat: answer.hosp.latitude,
            hLon: answer.hosp.longitude//hospital longitude value goes here
    
        });
              })

}

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

    //Takes in an object {"lat":123,"lng":123}
function latlong_distance(latlng1, latlng2){
    
  const R = 6371e3;
  var pi = Math.PI;

  var lat1 = latlng1.lat * (pi/180);
  var lat2 = latlng2.lat * (pi/180);

  var delta_lat = (latlng2.lat - latlng1.lat) * (pi/180);
  var delta_lng = (latlng2.lng - latlng1.lng) * (pi/180);

  var a = Math.sin(delta_lat/2) * Math.sin(delta_lat/2) +
      Math.cos(lat1) * Math.cos(lat2) *
      Math.sin(delta_lng/2) * Math.sin(delta_lng/2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  var d = (R * c) / 1000;
  return(d)

}