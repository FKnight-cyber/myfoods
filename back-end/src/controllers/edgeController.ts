import { Request, Response } from "express";
import edgeServices from "../services/edgeService";
import { PizzaEdges } from "@prisma/client";
import { IEdgeData } from "../types/edgeTypes";

export async function getEdges(req:Request, res:Response) {
    const edges = await edgeServices.findAllEdges();
    
    res.status(200).send(edges);
};

export async function editEdge(req:Request, res:Response){
    const { userInfo } = res.locals;

    const id:number = Number(req.params.id);
    const name:string = req.body.name;
    const price:number = req.body.price;

    const edgeUpdated:PizzaEdges = {
        id,
        name,
        price
    }

    const edge = await edgeServices.updateEdgeById(edgeUpdated, userInfo.data);
    
    res.status(200).send(edge);
};

export async function deleteEdge(req:Request, res:Response){
    const { userInfo } = res.locals;

    const id:number = Number(req.params.id);

    await edgeServices.deleleEdgeById(id, userInfo.data);

    res.sendStatus(200);
};

export async function createEdge(req:Request, res:Response) {
    const { userInfo } = res.locals;

    const name:string = req.body.name;
    const price:number = req.body.price;

    const edge:IEdgeData = {
        name,
        price
    }

    await edgeServices.addEdge(edge, userInfo.data);

    res.sendStatus(201);
}