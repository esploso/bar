const express = require("express");
const { sequelize, Koktel,Kategorija} = require("../models");
const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({extended:true}));
module.exports = route;

route.get("/", async (req, res) => {
    try{
        const kategorije = await Kategorija.findAll();
        return res.status(200).json(kategorije);
    }catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.get("/:id", async (req, res) => {
    try{
        const kategorija = await Kategorija.findByPk(req.params.id);
        return res.json(kategorija);
    }catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});


route.post("/", async (req, res) => {
    try{
        if (req.user && req.user.admin) {
            const novaKategorija = await Kategorija.create(req.body);
            return res.status(201).json(novaKategorija);
        } else {
            return res.status(403).json({error: "Unauthorized"});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});


route.put("/:id", async (req, res) => {
    try{
        if (req.user && req.user.admin) {
            const kategorija = await Kategorija.findByPk(req.params.id);
            kategorija.naziv = req.body.naziv;
            kategorija.kategorija_id = req.body.kategorija_id;
            kategorija.save();
            return res.json(kategorija);
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
            const kategorija = await Kategorija.findByPk(req.params.id);
            kategorija.destroy();
            return res.json( kategorija.id );
        } else {
            return res.status(403).json({error: "Unauthorized"});
    }
    }catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});
