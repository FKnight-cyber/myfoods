import { Request, Response } from "express";
import { IUserData } from "../types/authTypes";
import authServices from "../services/authService";

export async function signUp(req:Request, res:Response){

    const user:IUserData = {
        name:req.body.name,
        address: req.body.address,
        email: req.body.email,
        password: req.body.password
    };

    await authServices.signUp(user);

    res.sendStatus(201);
};