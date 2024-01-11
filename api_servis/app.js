const express = require('express');
const { sequelize, Koktel, Kategorija, KoktelSastojak, Sastojak, StavkaNarudzbine, Narudzbina } = require("./models");
const route = express.Router();
const app = express();
const jwt = require('jsonwebtoken');
require('dotenv').config();
function authToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (req.method === 'GET') {
        return next();
    }
    if (!token) {
        return res.status(401).json({ error: "Unauthorized: Token missing" });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: "Forbidden: Invalid token" });
        }

        req.user = user; // Set user information in the request object
        next();
    });
}
const cors = require("cors");
const corsOptions = {
    origin: ['http://localhost:8000', 'http://127.0.0.1:8000', 'http://localhost:3000', 'http://localhost:5173']
};
app.use(cors(corsOptions));

const jeloRoutes = require("./routes/koktel.js");
app.use("/kokteli",authToken, jeloRoutes);
const kategorijaRoutes = require("./routes/kategorija.js");
app.use("/kategorija",authToken, kategorijaRoutes);
const narudzbinaRoutes = require("./routes/narudzbina.js");
app.use("/narudzbina",authToken, narudzbinaRoutes);
const sastojakRoutes = require("./routes/sastojak.js");
app.use("/sastojak",authToken, sastojakRoutes);
const promenaCene = require("./routes/promenaCene.js");
app.use("/promeni-cenu",authToken, promenaCene);


app.listen({ port:9000 }, async () => {
    console.log("Started server on localhost:9000");
    await sequelize.sync({force:false});
    console.log("DB synced");
});
