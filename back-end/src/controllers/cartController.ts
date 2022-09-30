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

export async function removeItemFromCart(req:Request, res:Response) {
    const productId:number = Number(req.query.product);
    const itemId:number = Number(req.query.item);
    const quantity:number = Number(req.query.quantity);

    await cartServices.removeFromCart(productId, itemId, quantity);

    res.sendStatus(200);
};

export async function cleanCart(req:Request, res:Response){
    const { userInfo } = res.locals;

    const userId:number = userInfo.data.id;

    await cartServices.cleanCart(userId);

    res.sendStatus(200);
}