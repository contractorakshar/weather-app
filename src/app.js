const path = require('path');
const express = require('express');
const hbs = require('hbs');

require('dotenv').config();
const getCode = require('./utils/geoCode');
const forecast = require('./utils/forecast');

const app = express();
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Akshar Contractor'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Akshar Contractor'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: "Help Text",
        name: 'Akshar Contractor'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide an address!"
        });
    }

    getCode(req.query.address, (error, { lat, long, place } = {}) => {
        if (error) {
            return res.send({ error });
        }
        forecast(lat, long, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }

            res.send({
                forecast: forecastData,
                location: place,
                address: req.query.address
            });
        })
    });



})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: 'Error',
        errorMsg: "Help article not found!",
        name: 'Akshar Contractor'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: 'Error',
        errorMsg: "404. Page not found!",
        name: 'Akshar Contractor'
    });
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.');
})