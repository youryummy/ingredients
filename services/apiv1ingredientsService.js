import Ingredient from "../models/Ingredient.js";
import { Types } from 'mongoose'
import {logger} from "@oas-tools/commons";
import { CircuitBreaker } from "../utils/circuitBreaker.js";
import mongoose from "mongoose"; // eslint-disable-line
import recachegoose from "recachegoose"

recachegoose(mongoose, {});


export async function find(_req, res) {

    const { page = 1, limit = 100, created_by, search } = _req.query;

    try {

        let result;
        let count;

        // Si se busca por nombre y creador
        if (created_by !== undefined && search !== undefined) {
            result = await Ingredient.find({creado_por: {$regex: created_by, $options: "i"}, nombre: {$regex: search, $options: "i"}}).limit(Number(limit)).skip((page - 1) * limit).exec()
            count = await Ingredient.countDocuments({creado_por: {$regex: created_by, $options: "i"}, nombre: {$regex: search, $options: "i"}});
        } else if (created_by !== undefined) { // Cuando se busca por creador
            result = await Ingredient.find({creado_por: {$regex: created_by, $options: "i"}}).limit(Number(limit)).skip((page - 1) * limit).exec()
            count = await Ingredient.countDocuments({creado_por: {$regex: created_by, $options: "i"}});
        } else if (search !== undefined) { // Cuando se busca por nombre
            result = await Ingredient.find({nombre: {$regex: search, $options: "i"}}).limit(Number(limit)).skip((page - 1) * limit).exec()
            count = await Ingredient.countDocuments({nombre: {$regex: search, $options: "i"}});
        } else { // Resto de casos
            result = await Ingredient.find().cache(10).limit(Number(limit)).skip((page - 1) * limit).exec();
            count = await Ingredient.count().cache(10)
        }

        res.send({
            currentPage: parseInt(page, 10),
            totalPages: Math.ceil(count / limit),
            pageLimit: parseInt(limit, 10),
            result
        })

    } catch(err) {
        logger.error(`Error while getting all ingredients: ${err.message}`);
        res.status(500).send({ message: "Unexpected error ocurred, please try again later" });
    }
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

