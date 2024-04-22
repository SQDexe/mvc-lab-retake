const express = require('express');
const path = require('path');
const fs = require('fs');
const cheerio = require('cheerio');

const router = express.Router();

const appRoot = path.dirname(process.mainModule.filename);

const cars = [];
let nextId = 1;

router.get('/car', (req, res) => {
    fs.readFile(path.join(appRoot, 'views', 'car.html'), 'utf-8', (err, html) => {

        if (err)
            console.error(err);

        const $ = cheerio.load(html);

        if (cars.length == 0)
            $('.car').html('No cars has been found.');

        else {
            $('.car').append('<h2>Last added car</h2>');
            Object.entries(cars.at(-1)).forEach(([key, val]) => {
                if (key !== 'id')
                    $('.car').append(`<div><span class="bold">${key}:</span> ${val}</div>`);
                });
            }

        res.send($.html());
        });
    });

router.get('/car/add', (req, res) => {
    res.sendFile(path.join(appRoot, 'views', 'add-car.html'));
    });

router.get('/car/list', (req, res) => {
    fs.readFile(path.join(appRoot, 'views', 'cars-list.html'), 'utf-8', (err, html) => {

        if (err)
            console.error(err);

        const $ = cheerio.load(html);

        if (cars.length == 0)
            $('.car').html('No cars has been found.');

        else {
            $('.car').append('<h2>Cars</h2><ul></ul>');
            cars.forEach(car => {
                $('.car > ul').append('<li></li>');
                Object.entries(car).forEach(([key, val]) => {
                    if (key !== 'id')
                        $('.car > ul > li:last-child').append(`<p><span class="bold">${key}:</span> ${val}</p>`);
                    });
                });
            }

        res.send($.html());
        });
    });

router.post('/car/add', (req, res) => {
    let {make, model, year, color} = req.body;
    cars.push({id: nextId, make, model, year, color});
    nextId++;
    res.redirect('/car');
    });

module.exports = router;