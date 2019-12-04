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