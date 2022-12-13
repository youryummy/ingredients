import Ingredient from "../mongo/Ingredient.js";
import {logger} from "@oas-tools/commons";

export function findOne(_req, res) {
    const _id = _req.params.id;
    
    Ingredient.findById(_id).then(result => {
        if (result) {
            res.send(result);
        } else {
            res.status(404).send({message: `Ingredient with id '${_id}' does not exist`})
        }
    }).catch((err) => {
        logger.error(`Error while getting one ingredient: ${err.message}`);
        res.status(500).send({ message: "Unexpected error ocurred, please try again later" });
    });
}

export function updateIngredient(_req, res) {
    const _id = _req.params.id;
    const body = _req.body;  

    Ingredient.findByIdAndUpdate(_id, body).then(result => {
        if (result) {
            res.status(204).send();
        } else {
            res.status(404).send({message: `Ingredient with id '${_id}' does not exist`})
        }
        res.json(result);
    }).catch((err) => {
        logger.error(`Error while deleting one ingredient: ${err.message}`);
        res.status(500).send({ message: "Unexpected error ocurred, please try again later" });
    });
}

export function deleteIngredient(_req, res) {
    const _id = _req.params.id;
    
    Ingredient.findByIdAndDelete(_id).then(result => {
        if (result) {
            res.status(204).send();
        } else {
            res.status(404).send({message: `Ingredient with id '${_id}' does not exist`})
        }
        res.json(result);
    }).catch((err) => {
        logger.error(`Error while deleting one ingredient: ${err.message}`);
        res.status(500).send({ message: "Unexpected error ocurred, please try again later" });
    });
}