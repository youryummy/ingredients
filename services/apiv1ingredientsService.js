import Ingredient from "../models/Ingredient.js";
import { Types } from 'mongoose'
import {logger} from "@oas-tools/commons";
import { CircuitBreaker } from "../utils/circuitBreaker.js";

export async function find(_req, res) {

    const { page = 1, limit = 100, search } = _req.query;

    try {

        let result;
        let count;
        
        if (search !== undefined) { // Cuando se busca por nombre
            result = await Ingredient.find({nombre: {$regex: search, $options: "i"}}).limit(limit * 1).skip((page - 1) * limit).exec()
            count = await Ingredient.countDocuments({nombre: {$regex: search, $options: "i"}});
        } else { // Resto de casos
            result = await Ingredient.find().cache(10).limit(limit * 1).skip((page - 1) * limit).exec();
            count = await Ingredient.count().cache(10)
        }

        res.send({
            currentPage: parseInt(page),
            totalPages: Math.ceil(count / limit),
            pageLimit: parseInt(limit),
            result
        })

    } catch(err) {
        logger.error(`Error while getting all ingredients: ${err.message}`);
        res.status(500).send({ message: "Unexpected error ocurred, please try again later" });
    };
}

export function addIngredient(_req, res) {
    
    const body = _req.body; 
    body._id = new Types.ObjectId();

    CircuitBreaker.getBreaker(Ingredient).fire("create", body).then(() => {
        res.status(201).send({ ...body, message: "Ingredient created successfully!" });
    }).catch((err) => {
        logger.error(`Error while creating ingredient: ${err.message}`);
        res.status(500).send({ message: "Unexpected error ocurred, please try again later" });
    });
}

