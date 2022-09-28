import { Request, Response } from "express";
import categoryServices from "../services/categoriesService";

export async function getCategories(req:Request, res:Response) {

    const categories = await categoryServices.getCategories();
    
    res.status(200).send(categories);
}