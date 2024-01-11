const express = require('express');
const { sequelize, Users } = require('./models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

const app = express();


var corsOptions = {
    origin: ['http://localhost:5173','http://localhost:3000','http://localhost:8000'],
    optionsSuccessStatus: 200
}


app.use(express.json());
app.use(cors(corsOptions));


app.post('/register', async (req, res) => {
    try {
        const obj = {
            username: req.body.username,
            email: req.body.email,
            admin: false,
            password: bcrypt.hashSync(req.body.password, 10),
        };

        console.log(obj);

        // Assuming Users.create returns a Promise
        const rows = await Users.create(obj);

        const usr = {
            userId: rows.id,
            user: rows.username,
            admin: rows.admin
        };

        const token = jwt.sign(usr, process.env.ACCESS_TOKEN_SECRET);

        // Respond with the token
        res.json({ token });
    } catch (err) {
        console.error('Error during registration:', err);

        // Provide a more informative response based on the error
        if (err.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ error: 'Username or email already exists.' });
        }

        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/login', (req, res) => {
    Users.findOne({ where: { username: req.body.username } })
        .then( usr => {
            if (bcrypt.compareSync(req.body.password, usr.password)) {
                const obj = {
                    userId: usr.id,
                    user: usr.username,
                    admin: usr.admin
                };
                const token = jwt.sign(obj,
                    process.env.ACCESS_TOKEN_SECRET);
                res.json({ token: token });
            } else {
                res.status(400).json({ msg: "Invalid credentials"});
            }
        })
        .catch( err => res.status(500).json(err) );
});



app.listen({ port: 9001 }, async () => {
    await sequelize.authenticate();
});
