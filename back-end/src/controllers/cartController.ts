import { Request, Response } from "express";
import cartServices from "../services/cartService";

export async function addToCart(req:Request, res:Response) {
    const { userId, productId, quantity } : 
    { 
        userId:number, 
        productId:number, 
        quantity:number 
    } = req.body

    await cartServices.addToCart({
        userId,
        productId,
        quantity
    });

    res.sendStatus(201);
}