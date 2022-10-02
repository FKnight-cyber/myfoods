import { Request, Response, NextFunction } from "express";
import productSchema from "../schemas/productSchema";

export default function productValidation(req:Request, 
    res:Response, 
    next:NextFunction) {
        const { error } = productSchema.validate(req.body, {abortEarly:false});

        if(error) return res.status(422).send(error.details.map(detail => detail.message));

        next();
};