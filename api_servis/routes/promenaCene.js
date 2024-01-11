const express = require("express");
const { sequelize, Koktel, StavkaNarudzbine,Narudzbina} = require("../models");
const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({extended:true}));
module.exports = route;


route.put("/:id", async (req,res)=>{
    try{
        console.log(req.user);
        if (req.user.admin === true) {
            const koktel = await Koktel.findByPk(req.params.id);  //iz url
            koktel.cena = req.body.cena;  //iz body
            koktel.save();
            return res.json(koktel);
        } else {
            return res.status(403).json({error: "Unauthorized"});
        }
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});


