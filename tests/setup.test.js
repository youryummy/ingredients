import { logger } from "@oas-tools/commons";
import Ingredient from "../models/Ingredient.js";
import server from '../server.js';
import mongoose from "mongoose";
import dotenv from "dotenv";

process.env.NODE_ENV = "test";
logger.configure({ level: "off" });

// Populate test db and cleanup after integration tests
if (process.argv.includes("tests/component")) {
    dotenv.config({ path: ".env.test" }); // load test env variables

    const mongoHost = process.env.MONGO_HOST;
    const mongoDBName = process.env.MONGO_DBNAME;
    const mongoProto = process.env.MONGO_PROTO;
    const mongoUser = process.env.MONGO_USER;
    const mongoPwd = process.env.MONGO_PWD;
    
    mongoose.set('strictQuery', false);
    await mongoose.connect("mongodb://localhost:27017/test").then(async () => {

        await Ingredient.insertMany([
            { nombre: "test1", creado_por: "test1", marca: "test1" },
            { nombre: "test2", creado_por: "test2", marca: "test2" },
            { nombre: "test3", creado_por: "test3", marca: "test3" },
            { nombre: "test4", creado_por: "test4", marca: "test4" },
            { nombre: "test5", creado_por: "test5", marca: "test5" },
            { nombre: "test6", creado_por: "test6", marca: "test6" },
            { nombre: "test7", creado_por: "test7", marca: "test7" },
            { nombre: "test8", creado_por: "test8", marca: "test8" },
        ]);
        
        const oldExit = process.exit;
        process.exit = async (code) => {
            await mongoose.connection.db.dropCollection("ingredient");                                                         
            await mongoose.disconnect();
            oldExit(code);
        };

        await server.deploy(process.env.NODE_ENV).catch(err => { console.log(err); });
        
    }).catch((err) => {
        console.log("Failed to connect to test db: ", err.message);
        process.exit(1);
    });
}