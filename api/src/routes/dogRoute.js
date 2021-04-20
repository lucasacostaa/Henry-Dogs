const Router = require("express").Router();
const { Dog, Temperament } = require("../db");
const Promise = require("bluebird");
const axios = require("axios");
const {Op} = require("sequelize");

Router.post("/poblate", async (req, res) => {
    const isLoaded = await Dog.count()

    if(isLoaded > 100){ return res.status(200)}
    try {

        // Gets all breeds
        const response = await axios.get("https://api.thedogapi.com/v1/breeds", null, 
            {headers: {
                "x-api-key": process.env.API_KEY
            }}
        )

        // Iterates through the api response, creates the dogs and sets their temperaments
        await Promise.each(response.data, async el => {
            let {name, weight, height, life_span, temperament, image: {url}} = el;
            let temperament2 = temperament ? temperament.split(', ') : null;

            weight = weight.metric + " kg"
            height = height.metric + " cm"

            const splitted = weight.split(' ');
            let weight_avg;
            if(splitted.length < 3){
                weight_avg = parseInt(splitted[0], 10)
            } else {
                weight_avg = (parseInt(splitted[0], 10) + parseInt(splitted[2], 10)) / 2
            }

            // Finds the temperaments id
            let temperament3 = await Temperament.findAll({where: {name: temperament2}});
            let lista = temperament3.map(el => el.id)

            const newDog = await Dog.create({name, weight, height, life_span, image: url, weight_avg})
            if(temperament) await newDog.setTemperaments(lista)
        })

        res.json('Data loaded')
    } catch (err) {
        res.send(err)
    }
})

Router.post("/", async (req, res) => {
    try {
        const {name, weight, height, life_span, temperament, image} = req.body;

        const splitted = weight.split(' ');
        let weight_avg;
        if(splitted.length < 3){
            weight_avg = parseInt(splitted[0], 10)
        } else {
            weight_avg = (parseInt(splitted[0], 10) + parseInt(splitted[2], 10)) / 2
        }

        // Creates dog
        const newDog = await Dog.create({name, weight, height, life_span, created: true, image, weight_avg})

        //Find or creates temperaments
        const tempNames = temperament.split(", ");
        const promisesArray = tempNames.map(name => Temperament.findOrCreate({where: {name}}))
        const response = await Promise.all(promisesArray)

        // Set dog temperaments
        const tempsId = response.map(el => el[0].dataValues.id)
        newDog.setTemperaments(tempsId)

        const data = [newDog, tempsId]
        res.send(data)
    } catch (err) {
        const error = err.message === "llave duplicada viola restricción de unicidad «dogs_name_key»" ? "Breed already exists" : err.message
        return res.status(500).json(error)
    }
})

module.exports = Router;