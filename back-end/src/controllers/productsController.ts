import { Request, Response } from "express";
import productServices from "../services/productService";

export async function getProducts(req:Request, res:Response){
    const category:string = req.query.category!.toString();

    const products = await productServices.getProductsByCategoryName(category)

    res.status(200).send(products);
};

export async function addProduct(req:Request, res:Response) {
    const { name, image, category, description, quantity, price } : 
    { 
        name:string, 
        image:string, 
        category:string, 
        description:string, 
        quantity:number, 
        price:number 
    } = req.body;

    await productServices.addProduct(name, image, category, description, quantity, price);

    res.sendStatus(201);
}