const express = require('express');
const fetch = require('node-fetch');

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

// input function to access db 


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
 