import { Request, Response } from "express";
import categoryServices from "../services/categoriesService";

export async function getCategories(req:Request, res:Response) {

    const categories = await categoryServices.getCategories();
    
    res.status(200).send(categories);
}

export async function editCategory(req:Request, res:Response){

    const id:number = Number(req.params.id);
    const name:string = req.body.name;

    const category = await categoryServices.updateCategoryById(id, name);
    
    res.status(200).send(category);
}