const sqlite3 = require('sqlite3');

// takes /api request from index file & executes a fetch request to UMD.io
const apiURL = 'https://data.princegeorgescountymd.gov/resource/9r2z-mnpp.json'

app.get(apiURL, (req, res) => {
  fetch(apiURL)
    .then(r => r.json())
    .then(data => r.map(i = i.facility_name, i.address, i.telephone))
      console.log(data);
      
    // Creating dictionary to hold data
    const hospitalDict = {};

    // Iterating through data & assigning key/value pairs
    for(i = 0; i < data.length; i++) {
      hospitalDict.facility_name = i.facility_name;
      hospitalDict.geo = (i.address.latitude + ' ' + i.address.longitude);
      hospitalDict.address = i.address.human_address;
      hospitalDict.phone = i.telephone;
    };
    
    // Creating Database
    const dataBase = "db.sqlite"

    let db = new sqlite3.Database(dataBase, (err) => {
      if (err) {
        // Cannot open database
        console.error(err.message)
        throw err
      }else{
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE user (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          facility_name text, 
          geo text UNIQUE, 
          address text,
          telephone text, 
          )`,
          (err) => {
            if (err) {
              // Table already created
            }else{
              // Table just created
              console.log('Table created successfully')
            }
          });

    
      

    });

    function buildTable(_dataBase, _hospitalDict) {
      for(i = 0; i < hospitalDict.length; i++) {
        db.run(insert, [i.facility_name,i.geo,i.address,i.telephone])
    }};

  });
