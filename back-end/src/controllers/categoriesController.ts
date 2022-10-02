import { Request, Response } from "express";
import categoryServices from "../services/categoriesService";

export async function getCategories(req:Request, res:Response) {

    const categories = await categoryServices.getCategories();
    
    res.status(200).send(categories);
};

export async function editCategory(req:Request, res:Response){
    const { userInfo } = res.locals;

    const id:number = Number(req.params.id);
    const name:string = req.body.name;

    const category = await categoryServices.updateCategoryById(id, name, userInfo);
    
    res.status(200).send(category);
};

export async function deleteCategory(req:Request, res:Response){
    const { userInfo } = res.locals;

    const id:number = Number(req.params.id);

    await categoryServices.deleleCategoryById(id, userInfo);

    res.sendStatus(200);
};

export async function createCategory(req:Request, res:Response) {
    const { userInfo } = res.locals;

    const name:string = req.body.name;

    await categoryServices.addCategory(name, userInfo);

    res.sendStatus(201);
}