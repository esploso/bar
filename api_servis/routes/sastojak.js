const express = require("express");
const { sequelize, Koktel, KoktelSastojak, Sastojak} = require("../models");
const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({extended:true}));
module.exports = route;

route.get("/", async (req, res) => {
    try{
        const kategorije = await Sastojak.findAll();
        return res.json(kategorije);
    }catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.get("/:id", async (req, res) => {
    try{
        const sastojak = await Sastojak.findByPk(req.params.id);
        return res.json(sastojak);
    }catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});


route.post("/", async (req, res) => {
    try{
        if (req.user && req.user.admin) {
            const noviSastojak = await Sastojak.create(req.body);
            return res.status(201).json(noviSastojak);
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
            const sastojak = await Sastojak.findByPk(req.params.id);
            sastojak.naziv = req.body.naziv;
            sastojak.save();
            return res.json(sastojak);
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
            const sastojak = await Sastojak.findByPk(req.params.id);
            sastojak.destroy();
            return res.json( sastojak.id );
        } else {
            return res.status(403).json({error: "Unauthorized"});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});
