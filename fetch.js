const sqlite3 = require('sqlite3');

// takes /api request from index file & executes a fetch request to UMD.io
const apiURL = 'https://data.princegeorgescountymd.gov/resource/9r2z-mnpp.json'

app.get(apiURL, (req, res) => {
  fetch(apiURL)
    .then(r => r.json()
    .then(data => data.map(a => ({name: a.facility_name, address: a.address, h_address: a.human_address, tel: a.telephone, web: a.website})))
    .then(data => {
      
      const hospitalDict = {};
    
    }
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
      }

    function buildTable(_dataBase, _hospitalDict) {
      for(i = 0; i < hospitalDict.length; i++) {
        db.run(insert, [i.facility_name,i.geo,i.address,i.telephone])
    }};

  });
