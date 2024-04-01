
const express = require('express');
const app = express()
const cors = require("cors");
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const PORT = 3030;
const fs = require("fs");

let count = 0;
app.listen(
    PORT,
    () => console.log(`it's alive on http://localhost:${PORT}`)
)

app.get('/', (req, res) => {
    res.send("Yo this is the API");
})

app.get('/getChoices', (req, res) =>{
    const data = fs.readFileSync("./cache.json", "utf-8");
    const dataJson = JSON.parse(data);
    const json = JSON.stringify(dataJson);
    console.log("choices were sent");
    res.status(201).send(json);
});

app.get('/data', (req, res) => {
    const data = fs.readFileSync("./data.json", "utf-8");
    const dataJson = JSON.parse(data);
    const json = JSON.stringify(dataJson);
    res.status(201).send(json);
});

app.post('/update', (req, res) => {
    console.log(req.body);
    console.log("update data");
    const json = JSON.stringify(req.body);
    fs.writeFileSync('data.json', json)
});

app.post('/updateChoices', (req, res) => {
    console.log(req.body);
    console.log("choices updated");
    const json = JSON.stringify(req.body);
    fs.writeFileSync('cache.json', json)
});



