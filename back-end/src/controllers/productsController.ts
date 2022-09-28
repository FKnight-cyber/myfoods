import { Request, Response } from "express";
import productServices from "../services/productService";

export async function getProducts(req:Request, res:Response){
    const category:string = req.query.category!.toString();

    const products = await productServices.getProductsByCategoryName(category)

    res.status(200).send(products);
}