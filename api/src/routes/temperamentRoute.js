const Router = require("express").Router();
const axios = require("axios");
const { Temperament } = require("../db");

Router.get('/', async (req, res) => {

    // If temperaments were already created it just returns them
    const isLoaded = await Temperament.count()
    
    if(isLoaded >= 1) {
        try {
            const response = await Temperament.findAll({
                attributes: ["name"]
            })

            const list = response.map(el => el.name)
            return res.send(list)
        } catch (err) {
            res.status(500).send(err)
        }
    }

    // First time fetching and creating temperaments from Dog API 
    try {
        const response = await axios.get("https://api.thedogapi.com/v1/breeds", null, 
        {headers: {
            "x-api-key": process.env.API_KEY
        }});

        // Search all temperaments and delete nulls
        const nullDel = el => (typeof el) === "string";
        const rawTemps = response.data.map(el => el.temperament).filter(nullDel);
        const temps = (rawTemps.map(el => el.split(', '))).flat(1);

        // Delete duplicated
        const uniqArray = a => [...new Set(a)]
        const tempPromises = uniqArray(temps).map(name => Temperament.create({name}));
        

        const tempList = await Promise.all(tempPromises)

        res.json(tempList)
    } catch (err) {
        res.send(err)
    }
    
   
})

module.exports = Router;