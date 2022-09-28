import { Request, Response } from "express";
import { IUserData,IUserLoginData } from "../types/authTypes";
import authServices from "../services/authService";

export async function signUp(req:Request, res:Response){

    const user:IUserData = {
        name:req.body.name,
        cep: req.body.cep,
        houseNumber: req.body.houseNumber,
        email: req.body.email,
        password: req.body.password
    };

    await authServices.signUp(user);

    res.sendStatus(201);
};

export async function signIn(req:Request, res:Response){

    const user:IUserLoginData = {
        email: req.body.email,
        password: req.body.password
    };

    const token = await authServices.signIn(user);

    res.status(200).send(token);
};