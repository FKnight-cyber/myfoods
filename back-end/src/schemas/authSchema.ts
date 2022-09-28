import joi from "joi";

export const signUpSchema = joi.object({
    name: joi.string().max(60).required(),
    cep: joi.string().min(8).max(8).required(),
    houseNumber: joi.string().max(10).required(),
    email: joi.string().email().required(),
    password: joi.string().max(20).required()
});

export const signInSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
});