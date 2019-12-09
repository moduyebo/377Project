const sqlite3 = require('sqlite3').verbose() 

app.get('\api', (req, res) => {
    const apiURL = 'https://data.princegeorgescountymd.gov/resources/9r2z-mnpp.json'
    fetch(apiURL)
        .then(r => r.json())
        .then(data => data.map(a => ({name: a.facility_name, latitude: a.address.latitude, 
            longitude: a.address.longitude, address: a.address.human_address, telephone: a.telephone,
            web: a.website}))
        .then(data => {

            // creating database file 
            let db = new sqlite3.Datbase('./sqlite.db');

            // creating hospitals table in db
            let init = function () {
                db.run('CREATE TABLE if not exists hospitals (' + 
                    'name TEXT PRIMARY KEY,' +
                    'geolocation TEXT,' +
                    'address TEXT,' +
                    'phone INTEGER,' +
                    'website TEXT' + 
                    ')');
                
                // inserting data into hospitals table  
                data.forEach(item => {
                    db.run('INSERT INTO hospitals(name,geolocation,address,phone,website) VALUES(name,latitude + ',' + longitiude,address,telephone,web) ');
                });
            }
        }));

});