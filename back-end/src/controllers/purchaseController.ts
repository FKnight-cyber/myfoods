import { Request, Response } from "express";
import purchaseServices from "../services/purchaseService";

export async function finishOrder(req:Request, res:Response){
    const { userInfo } = res.locals;

    const userId = userInfo.data.id

    const { products } : { products:number[] } = req.body;

    await purchaseServices.purchase(userId,products);

    res.sendStatus(201);
};

export async function getUserPurchases(req:Request, res:Response) {
    const { userInfo } = res.locals;

    const user = userInfo.data;

    const purchases = await purchaseServices.getUserInfo(user.id);
    
    res.status(200).send(purchases);
}

export async function getPurchaseInfo(req:Request, res:Response) {
    const { userInfo } = res.locals;

    const { dateInit, dateEnd } = req.body;

    const user = userInfo.data;
    
    const purchases = await purchaseServices.getDailyInfo(user, dateInit, dateEnd);
    
    res.status(200).send(purchases);
}