const express = require('express');
const fetch = require('node-fetch');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', function(req, res) {
    let data = {
        message: 'Hello World!'
    };
    res.status(200).send(data);
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
 