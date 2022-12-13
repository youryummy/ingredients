import Ingredient from "../mongo/Ingredient.js";
import { Types } from 'mongoose'
import {logger} from "@oas-tools/commons";
import _ from "lodash";

export async function find(_req, res) {

    const { page = 1, limit = 100 } = _req.query;

    try {

        const result = await Ingredient.find().limit(limit * 1).skip((page - 1) * limit).exec();
        const count = await Ingredient.count();

        res.send({
            currentPage: page,
            totalPages: Math.ceil(count / limit),
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

    Ingredient.create(body).then(() => {
        res.status(201).send();
    }).catch((err) => {
        logger.error(`Error while creating ingredient: ${err.message}`);
        res.status(500).send({ message: "Unexpected error ocurred, please try again later" });
    });
}

