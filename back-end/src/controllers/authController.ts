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
    
    if(token[1] === "admin"){
    return res.status(200).send({token:token[0], redirectTo:"/admin/control"});
    }

    res.status(200).send(token);
};

export async function getUserInfo(req:Request, res:Response){
    const  { userInfo }  = res.locals;

    const allInfo = await authServices.getUserInfo(userInfo);

    res.status(200).send(allInfo);
}