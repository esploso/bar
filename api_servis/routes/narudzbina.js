const express = require("express");
const { sequelize, Koktel, StavkaNarudzbine,Narudzbina, Kategorija, Sastojak} = require("../models");
const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({extended:true}));
module.exports = route;

route.get("/", async (req, res) => {
    try{
        const narudzbine = await Narudzbina.findAll({
            include: [{
                model: StavkaNarudzbine,
                include: [
                    {
                        model: Koktel,
                        as: 'koktel',
                    },
                ],
            },]
        });
        return res.json(narudzbine);
    }catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.get("/:id", async (req, res) => {
    try{
        const narudzbina = await Narudzbina.findByPk(req.params.id);
        return res.json(narudzbina);
    }catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});


route.post('/', async (req, res) => {
    try {
        if (req.user && req.user.admin) {
            const { user, cart } = req.body;

            // Create a new order (Narudzbina)
            const newOrder = await Narudzbina.create({
                status: 'poruceno', // Assuming 'poruceno' is a valid status
                vremeNarucivanja: new Date(),
                zakazanoVreme: null,
                adresa: '123 Main Street', // Set to the actual address from the user or elsewhere
                brojTelefona: '', // Set to the actual phone number from the user or elsewhere
                ime_Prezime: user.user, // Assuming user.user is the name, adjust accordingly
                stavkaNarudzbine_id: 1, // Assuming a default value for stavkaNarudzbine_id
            });

            // Iterate through the cart and create associated items (StavkaNarudzbine)
            for (let i = 0; i < cart.length; i++) {
                if (cart[i] !== null) {
                    const koktel = await Koktel.findByPk(i);

                    // Create a new StavkaNarudzbine for each item in the cart
                    const newStavka = await StavkaNarudzbine.create({
                        komada: cart[i],
                        narudzbina_id: newOrder.id,
                        koktel_id: i,
                        jedinicnaCena: koktel.cena,
                    });
                }
            }

            return res.status(201).json(newOrder);
        } else {
            return res.status(403).json({error: "Unauthorized"});
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error', data: err });
    }
});


route.put("/:id", async (req, res) => {
    try{
        if (req.user && req.user.admin) {
            const narudzbina = await Narudzbina.findByPk(req.params.id);
            narudzbina.status = req.body.status;
            narudzbina.vremeNarucivanja = req.body.vremeNarucivanja;
            koktel.zakazanoVreme = req.body.zakazanoVreme;
            koktel.adresa = req.body.adresa;
            koktel.brojTelefona = req.body.brojTelefona;
            koktel.ime_Prezime = req.body.ime_Prezime;
            koktel.stavkaNarudzbine_id = req.body.stavkaNarudzbine_id;
            narudzbina.save();
            return res.json(narudzbina);
        } else {
            return res.status(403).json({error: "Unauthorized"});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});


route.delete("/:id", async (req, res) => {
    try{
        if (req.user && req.user.admin) {
            const narudzbina = await Narudzbina.findByPk(req.params.id);
            narudzbina.destroy();
            return res.json( narudzbina.id );
        } else {
            return res.status(403).json({error: "Unauthorized"});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});
