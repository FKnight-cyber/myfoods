import joi from "joi";

export const productSchema = joi.object({
    name: joi.string().required(),
    image: joi.string().required(),
    category: joi.string().required(),
    description: joi.string().required(),
    quantity: joi.number().min(1).required(),
    price: joi.number().min(1).required()
});

export const productUpdateSchema = joi.object({
    name: joi.string().required(),
    image: joi.string().required(),
    description: joi.string().required(),
    quantity: joi.number().min(1).required(),
    price: joi.number().min(1).required()
});
