import prisma from "../database";
import { IEdgeData } from "../types/edgeTypes";
import { PizzaEdges } from "@prisma/client";

async function getEdges() {
    return await prisma.pizzaEdges.findMany({orderBy:{id:'asc'}});
};

async function insert(edge:IEdgeData){
    await prisma.pizzaEdges.create({data:edge});
}

async function update(edge:PizzaEdges){
    await prisma.pizzaEdges.update({
        where:{
            id:edge.id
        },
        data:{
            name:edge.name,
            price:edge.price
        }
    });
};

async function remove(id:number) {
    await prisma.pizzaEdges.delete({where:{id}});
};

async function findEdgeById(id:number) {
    return await prisma.pizzaEdges.findUnique({where:{id}});
};

async function findEdgeByName(name:string) {
    return await prisma.pizzaEdges.findFirst({where:{name}});
};

const edgesRepository = {
    getEdges,
    insert,
    update,
    remove,
    findEdgeById,
    findEdgeByName
};

export default edgesRepository;