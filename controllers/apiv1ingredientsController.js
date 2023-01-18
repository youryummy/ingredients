import * as service from '../services/apiv1ingredientsService.js';

export function find(req, res) {
    service.find(req, res);
}

export function addIngredient(req, res) {
    service.addIngredient(req, res);
}

