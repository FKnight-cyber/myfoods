"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const productSchema_1 = require("../schemas/productSchema");
const productValidation = (schema) => async function authValidation(req, res, next) {
    if (schema === "create") {
        const { error } = productSchema_1.productSchema.validate(req.body, { abortEarly: false });
        if (error)
            return res.status(422).send(error.details.map(detail => detail.message));
        next();
    }
    ;
    if (schema === "update") {
        const { error } = productSchema_1.productUpdateSchema.validate(req.body, { abortEarly: false });
        if (error)
            return res.status(422).send(error.details.map(detail => detail.message));
        next();
    }
    ;
};
exports.default = productValidation;
