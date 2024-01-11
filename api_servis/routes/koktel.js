const express = require("express");
const { sequelize, Kategorija, KoktelSastojak, Sastojak,Koktel} = require("../models");
const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({extended:true}));
module.exports = route;
const Joi = require('joi');

const shema = Joi.object().keys({
    nazivInput: Joi.string().trim().min(5).max(25).required(),
    opis: Joi.string().trim().min(1).required(),
    kategorija: Joi.string().trim().required(),
    cena: Joi.number().greater(0).required()
});
route.get("/", async (req, res) => {
    try{
        const kategorije = await Koktel.findAll({
            include: [{
                model: Sastojak,
                as: "sastojci",
                through: 'KoktelSastojak',
            },{
                model: Kategorija
            }]
        });

        return res.json(kategorije);

    }catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.get("/:id", async (req, res) => {
    try {
        const koktel = await Koktel.findByPk(req.params.id, {
            include: [{
                model: Sastojak,
                as: "sastojci",
                through: 'KoktelSastojak',
            },{
                model: Kategorija
            }]
        });
        return res.json(koktel);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});


route.post("/", async (req, res) => {
    try {
        if (req.user && req.user.admin) {
            const {naziv, opis, cena, kategorija_id} = req.body;

            req.body.kategorija_id = req.body.kategorija;
            const noviKoktel = await Koktel.create(req.body);

            console.log(req.body);
            return res.status(201).json(noviKoktel);
        } else {
            return res.status(403).json({error: "Unauthorized"});
        }
    }catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Greška prilikom kreiranja koktela", data: err });
    }
});

route.put("/:id", async (req, res) => {
    try{
        if (req.user && req.user.admin) {
            const id = req.params.id; // Get the cocktail ID from the URL
            const podaci = req.body;
            console.log(id);

            const updateovanKoktel = await Koktel.findByPk(id);

            if (!updateovanKoktel) {
                return res.status(404).json({ error: 'Cocktail not found' });
            }

            const rezultatValidacije = shema.validate(podaci);

                    if(rezultatValidacije.error){
                        return res.json({message:"Greska: " + rezultatValidacije.error.details[0].message});

                    }else{
                        updateovanKoktel.naziv = podaci.nazivInput;
                        updateovanKoktel.opis = podaci.opis;
                        updateovanKoktel.cena = podaci.cena;
                        updateovanKoktel.kategorija_id = podaci.kategorija;
                        updateovanKoktel.save();

                        return res.json(updateovanKoktel);
                    }
        } else {
            return res.status(403).json({error: "Unauthorized"});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.put("/dodajSastojak/:koktelId/:sastojakId", async (req, res) => {
    try {
        if (req.user && req.user.admin) {
            const { koktelId, sastojakId } = req.params;

            // Find the Koktel and Sastojak by their IDs
            //console.log(req.params);
            const koktel = await Koktel.findByPk(koktelId);
            const sastojak = await Sastojak.findByPk(sastojakId);

            if (!koktel || !sastojak) {
                return res.status(404).json({ error: "Koktel or Sastojak not found" });
            }

            // Add the Sastojak to the Koktel
            await koktel.addSastojci(sastojak);

            return res.status(200).json({ message: "Sastojak added to Koktel successfully" });
        } else {
            return res.status(403).json({error: "Unauthorized"});
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});
route.delete("/:id", async (req, res) => {
    try{
        if (req.user && req.user.admin) {
        const koktel = await Koktel.findByPk(req.params.id);
        await koktel.destroy();
        return res.json( koktel.id );
    } else {
        return res.status(403).json({error: "Unauthorized"});
    }
    }catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});
route.delete("/izbrisiSastojak/:koktelId/:sastojakId", async (req, res) => {
    try{
        if (req.user && req.user.admin) {
            const { koktelId, sastojakId } = req.params;

            // Find the Koktel and Sastojak by their IDs
            //console.log(req.params);
            const koktel = await Koktel.findByPk(koktelId);
            const sastojak = await Sastojak.findByPk(sastojakId);

            if (!koktel || !sastojak) {
                return res.status(404).json({ error: "Koktel or Sastojak not found" });
            }

            // Add the Sastojak to the Koktel
            await koktel.removeSastojci(sastojak);

            return res.status(200).json({ message: "Sastojak added to Koktel successfully" });
        } else {
            return res.status(403).json({error: "Unauthorized"});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});
