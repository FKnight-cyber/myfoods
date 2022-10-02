import { Request, Response, NextFunction } from "express";
import categorySchema from "../schemas/categorySchema";

export default function categoryValidation(req:Request, 
    res:Response, 
    next:NextFunction) {
        const { error } = categorySchema.validate(req.body);

        if(error) return res.status(422).send(error.details.map(detail => detail.message));

        next();
};