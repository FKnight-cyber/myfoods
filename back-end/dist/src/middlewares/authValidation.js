"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authSchema_1 = require("../schemas/authSchema");
const authValidation = (schema) => async function authValidation(req, res, next) {
    if (schema === "signin") {
        const { error } = authSchema_1.signInSchema.validate(req.body, { abortEarly: false });
        if (error)
            return res.status(422).send(error.details.map(detail => detail.message));
        next();
    }
    ;
    if (schema === "signup") {
        const { error } = authSchema_1.signUpSchema.validate(req.body, { abortEarly: false });
        if (error)
            return res.status(422).send(error.details.map(detail => detail.message));
        next();
    }
    ;
};
exports.default = authValidation;
