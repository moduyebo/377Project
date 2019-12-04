const express = require('express');
const fetch = require('node-fetch');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

// tester
app.get('/api', (req, res) => {
    const baseURL = 'https://api.umd.io/v0/courses/list';
    fetch(baseURL)
      .then((r) => r.json())
      .then((data) => {
        let instCo = data.filter(ele => ele.course_id.includes("INST"));
        //console.log(instCo);
        //console.log(instCo.length);
        return instCo;
      })
      .then(data =>
        {
          let newArr = [];
          for (i = 0; i < data.length; i++)
          {
            newArr[i] = data[i].course_id +": "+ data[i].name;
          }
          console.log(newArr);
          res.send(newArr);
          return newArr;
        })
  });
//tester end


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
 