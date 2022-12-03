"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkError = void 0;
async function errorHandler(error, req, res, next) {
    return res.status(error.status).send(error.message);
}
exports.default = errorHandler;
;
function checkError(status, message) {
    return {
        status,
        message
    };
}
exports.checkError = checkError;
