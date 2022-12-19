import http from "http";
import express from "express";
import { initialize, use } from "@oas-tools/core";
import { OASSwagger } from "./middleware/oas-swagger.js";

const deploy = async (env) => {
    const serverPort = process.env.PORT ?? 8080;
    const app = express();
    app.use(express.json({limit: '50mb'}));
    
    // Feature toggles
    let config = {}
    if (env === "production") {
        config.middleware = { 
            validator: { requestValidation: false, responseValidation: false } // Done in gateway
        }
    }

    // Initialize OAS Tools
    use(OASSwagger, {path: "/docs"});
    initialize(app).then(() => {
        http.createServer(app).listen(serverPort, () => {
        console.log("\nApp running at http://localhost:" + serverPort);
        console.log("________________________________________________________________");
        if (config?.middleware?.swagger?.disable !== false) {
            console.log('API docs (Swagger UI) available on http://localhost:' + serverPort + '/docs');
            console.log("________________________________________________________________");
        }
        });
    });
}

const undeploy = () => {
  process.exit();
};

export default {deploy, undeploy}

