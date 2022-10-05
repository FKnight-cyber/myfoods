import { Request, Response } from "express";
import productServices from "../services/productService";

export async function getProducts(req:Request, res:Response){
    const category:string = req.query.category!.toString();

    const products = await productServices.getProductsByCategoryName(category)

    res.status(200).send(products);
};

export async function addProduct(req:Request, res:Response) {
    const { userInfo } = res.locals;

    const { name, image, category, description, quantity, price } : 
    { 
        name:string, 
        image:string, 
        category:string, 
        description:string, 
        quantity:number, 
        price:number 
    } = req.body;

    await productServices.addProduct(name, image, category, description, quantity, price, userInfo.data);

    res.sendStatus(201);
};

export async function getAllProducts(req:Request, res:Response) {
    
    const products = await productServices.getAll();

    res.status(200).send(products);
};

export async function deleteProduct(req:Request, res:Response) {
    const { userInfo } = res.locals;

    const id:number = Number(req.params.id);

    await productServices.removeProduct(id, userInfo.data);

    res.sendStatus(201);
};

export async function editProduct(req:Request, res:Response) {
    const { userInfo } = res.locals;

    const id:number = Number(req.params.id);

    const { name, image, description, quantity, price } : 
    { 
        name:string, 
        image:string, 
        description:string, 
        quantity:number, 
        price:number 
    } = req.body;

    await productServices.editProduct(name, image, description, quantity, price, id, userInfo.data);

    res.sendStatus(200);
};