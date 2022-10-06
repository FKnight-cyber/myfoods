import prisma from "../database";
import { IUserData } from "../types/authTypes"

async function insert(user:IUserData) {
    await prisma.user.create({data:user})
}

async function findUser(email:string) {
    return await prisma.user.findUnique({where:{email}});
}


const authRepository = {
    insert,
    findUser
};

export default authRepository;