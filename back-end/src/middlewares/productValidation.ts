import { Request, Response, NextFunction } from "express";
import { productSchema, productUpdateSchema } from "../schemas/productSchema";


const productValidation = (schema:string) => async function authValidation(req:Request, 
    res:Response, 
    next:NextFunction) {
        if(schema === "create"){
            const { error } = productSchema.validate(req.body, {abortEarly:false});

            if(error) return res.status(422).send(error.details.map(detail => detail.message));

            next();
        };

        if(schema === "update"){
            const { error } = productUpdateSchema.validate(req.body, {abortEarly:false});

            if(error) return res.status(422).send(error.details.map(detail => detail.message));

            next();
        };
};

export default productValidation;