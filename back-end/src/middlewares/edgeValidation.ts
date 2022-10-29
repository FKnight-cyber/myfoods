import { Request, Response, NextFunction } from "express";
import edgeSchema from "../schemas/edgeSchema";

export default function edgeValidation(req:Request, 
    res:Response, 
    next:NextFunction) {
        const { error } = edgeSchema.validate(req.body, {abortEarly:false});

        if(error) return res.status(422).send(error.details.map(detail => detail.message));

        next();
};