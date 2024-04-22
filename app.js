const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const homeRouter = require('./routes/home.js');
const carsRouter = require('./routes/cars.js');

const PORT = 3000;

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));

app.use(homeRouter);
app.use(carsRouter);
app.use((req, res) => {
    res.status(404).send('Page not found');
    })

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    });