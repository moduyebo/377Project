const express = require('express');
const fetch = require('node-fetch');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//app.use(express.static('public'));

app.get('/',(req, res) => {
    fetch('about.html')
})//res.render('index'));


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
 