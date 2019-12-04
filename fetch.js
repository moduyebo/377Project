const apiURL = 'https://data.princegeorgescountymd.gov/resources/9r2z-mnpp.json'

app.get(apiURL, (req, res) => {
    fetch(apiURL)
        .then(r => r.json())
        .then(data => data.map(a => ({name: a.facility_name, latitude: a.address.latitude, 
            longitude: a.address.longitude, address: a.address.human_address, telephone: a.telephone,
            web: a.website}))
        .then(data => {

            const dataBase = 'db.sqlite'

            let db = new.sqlite3.Database(dataBase, (err) =>)




        })


})