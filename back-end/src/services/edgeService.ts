import edgeRepository from "../repositories/edgeRepository";
import { checkError } from "../middlewares/errorHandler";
import { PizzaEdges } from "@prisma/client";
import { IUserData } from "../types/authTypes"
import { IEdgeData } from "../types/edgeTypes";

async function findAllEdges() {
    return await edgeRepository.getEdges();
};

async function updateEdgeById(edge:PizzaEdges, user:IUserData) {
    if(user.email !== process.env.ADMIN_EMAIL) throw checkError(401, "You shall not pass!!!");

    const checkEdge = await edgeRepository.findEdgeById(edge.id);

    if(!checkEdge) throw checkError(404, "Tipo de borda não está cadastrada!");

    await edgeRepository.update(edge);

    return {
        edge
    }
};

async function deleleEdgeById(id:number, user:IUserData) {
    if(user.email !== process.env.ADMIN_EMAIL) throw checkError(401, "You shall not pass!!!");

    const checkEdge = await edgeRepository.findEdgeById(id);

    if(!checkEdge) throw checkError(404, "Tipo de borda não está cadastrada!");

    await edgeRepository.remove(id);
};

async function addEdge(edge:IEdgeData, user:IUserData) {
    if(user.email !== process.env.ADMIN_EMAIL) throw checkError(401, "You shall not pass!!!");

    const edgeCategory = await edgeRepository.findEdgeByName(edge.name);

    if(edgeCategory) throw checkError(409, "Borda já está cadastrada!");

    await edgeRepository.insert(edge);
}

const edgeServices = {
    findAllEdges,
    updateEdgeById,
    deleleEdgeById,
    addEdge
};

export default edgeServices;