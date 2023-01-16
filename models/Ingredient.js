import { Schema, model} from "mongoose";

const ingredientSchema = new Schema({
    _id: Schema.Types.ObjectId,
    nombre: String,
    url: {
      type: String,
      validate: {
        validator: (value) => (/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/).test(value),
        message: () => `Invalid URL`
      }
    },
    creado_por: String,
    marca: String,
    imagen: {
      type: String,
      validate: {
        validator: (value) => (/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/).test(value),
        message: () => `Invalid URL`
      }
    },
    imagen_peq: {
      type: String,
      validate: {
        validator: (value) => (/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/).test(value),
        message: () => `Invalid URL`
      }
    },
  });

export default model('Ingredient', ingredientSchema, 'ingredients');
