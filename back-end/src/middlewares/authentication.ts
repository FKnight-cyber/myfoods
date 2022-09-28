import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { checkError } from "./errorHandler";

export default async function authentication(req:Request, res:Response, next:NextFunction) {
    const token:any = req.headers['x-access-token']!.toString();

    if(!token) throw checkError(401, "Você precisa enviar o token de autorização!");

    const secret = process.env.JWT_SECRET!.toString();

    try {
        jwt.verify(token, secret);

        const data = jwt.decode(token, {complete: true})

        res.locals.userInfo = data?.payload;
        
        next();
    } catch (error) {
        throw checkError(401, "Token inválido ou expirou!")
    }
}