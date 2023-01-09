import { Schema, model} from "mongoose";

const ingredientSchema = new Schema({
    _id: Schema.Types.ObjectId,
    nombre: String,
    url: String,
    creado_por: String,
    marca: String,
    imagen: String,
    imagen_peq: String,
  });

export default model('Ingredient', ingredientSchema, 'ingredients');