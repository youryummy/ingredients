import * as service from '../services/apiv1ingredientsidService.js';

export function updateIngredient(req, res) {
    service.updateIngredient(req, res);
}

export function deleteIngredient(req, res) {
    service.deleteIngredient(req, res);
}

