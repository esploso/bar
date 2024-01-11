const express = require('express');
const path = require('path');
const cors = require("cors");
const app = express();
const jwt = require('jsonwebtoken');
require('dotenv').config();

function getCookies(req) {
    if (req.headers.cookie == null) {
        return {};
    }


    const rawCookies = req.headers.cookie.split('; ');
    const parsedCookies = {};

    rawCookies.forEach( rawCookie => {
        const parsedCookie = rawCookie.split('=');
        parsedCookies[parsedCookie[0]] = parsedCookie[1];
    });


    return parsedCookies;
}

function authToken(req, res, next) {
    const cookies = getCookies(req);
    const token = cookies['token'];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.redirect(301, '/login');
        req.user = user;
        next();
    });
}

const corsOptions = {
    origin: ['http://localhost:8000', 'http://127.0.0.1:8000', 'http://localhost:3000']
};
app.use(cors(corsOptions));

const Joi = require('joi');

app.use(express.static( path.join(__dirname, 'static')));

app.get('/',authToken, (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'index.html'));
});

const BP = require('body-parser');
const fs = require("fs");
const buffer = require("buffer");
const {raw} = require("express");

const shema = Joi.object().keys({
    nazivInput: Joi.string().trim().min(5).max(25).required(),
    opis: Joi.string().trim().min(1).required(),
    kategorija: Joi.string().trim().required(),
    cena: Joi.number().greater(0).required()
});



// app.get("/kokteli", (req, res) => {
//     const kokteli = [];
//     fs.readFile('kokteli.txt', 'utf8', (err, data) => {
//         if (err) {
//             console.error('Error reading file:', err);
//             res.status(500).send({ error: "Greška" });
//         }else {
//             const redovi = data.split('\n');
//
//             for (let i = 0; i < redovi.length-1; i++) {
//                 let obj = JSON.parse(redovi[i]);
//                 kokteli.push(obj);
//             }
//             res.json(kokteli);
//         }
//     });
// })

console.log("OVDESAM")
app.listen(8000);