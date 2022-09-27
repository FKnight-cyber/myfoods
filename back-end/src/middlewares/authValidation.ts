import { Request, Response, NextFunction } from "express";
import { signInSchema,signUpSchema } from "../schemas/authSchema";

const authValidation = (schema:string) => async function authValidation(req:Request, 
    res:Response, 
    next:NextFunction) {
        if(schema === "signin"){
            const { error } = signInSchema.validate(req.body, {abortEarly:false});

            if(error) return res.status(422).send(error.details.map(detail => detail.message));

            next();
        };

        if(schema === "signup"){
            const { error } = signUpSchema.validate(req.body, {abortEarly:false});

            if(error) return res.status(422).send(error.details.map(detail => detail.message));

            next();
        };
};

export default authValidation;