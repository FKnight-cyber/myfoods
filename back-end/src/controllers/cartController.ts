import { Request, Response } from "express";
import cartServices from "../services/cartService";

export async function addToCart(req:Request, res:Response) {
    const { productId, quantity } : 
    {  
        productId:number, 
        quantity:number 
    } = req.body

    const { userInfo } = res.locals;

    const userId:number = userInfo.data.id;

    await cartServices.addToCart({
        userId,
        productId,
        quantity
    });

    res.sendStatus(201);
};

export async function getMyOrders(req:Request, res:Response){
    const { userInfo } = res.locals;

    const userId:number = userInfo.data.id;

    const products = await cartServices.listProducts(userId);

    res.status(200).send(products);
}