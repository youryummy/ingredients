import { Schema, model } from "mongoose";

const ingredientSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    nombre: String,
    url: String,
    creado_por: String,
    marca: String,
    imagen: String,
    imagen_peq: String,
  });

export default model('Ingredient', ingredientSchema, 'ingredient');