import { Express, Request, Response } from "express";
import { createUserSessionHandler, deleteUserSessionHandler, getUserSessionsHandler } from "./controllers/session.controller";
import { createUserHandler } from "./controllers/user.controller";
import validate from "./middlewares/validateResource";
import { createUserSchema } from "./schemas/user.schema";
import { createSessionSchema } from "./schemas/session.schema";
import requireUser from "./middlewares/requireUser";
import { createProductSchema, deleteProductSchema, findProductSchema, updateProductSchema } from "./schemas/product.schema";
import { createProductHandler, deleteProductHandler, findProductHandler, updateProductHandler } from "./controllers/product.controller";


export default function(app: Express){

    // Server Endpoints
    app.get("/healthcheck", (req:Request, res:Response) => {
        res.sendStatus(200);
    });

    // Users Endpoints
    app.post("/api/users", validate(createUserSchema), createUserHandler);

    // Sessions Endpoints
    app.post("/api/sessions", validate(createSessionSchema), createUserSessionHandler);
    app.get("/api/sessions", requireUser ,getUserSessionsHandler);
    app.delete("/api/sessions", requireUser ,deleteUserSessionHandler);
    
    // Products Endpoints
    app.get("/api/products", validate(findProductSchema), findProductHandler);
    app.post("/api/products", [requireUser, validate(createProductSchema)], createProductHandler);
    app.put("/api/products", [requireUser, validate(updateProductSchema)], updateProductHandler);
    app.delete("/api/products", [requireUser, validate(deleteProductSchema)], deleteProductHandler);
    
}