import joi from "joi";

const edgeSchema = joi.object({
    name: joi.string().required(),
    price: joi.number().min(1).required()
});

export default edgeSchema;