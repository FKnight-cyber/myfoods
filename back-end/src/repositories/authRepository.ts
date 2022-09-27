import prisma from "../database";
import { IUserData } from "../types/authTypes"

async function insert(user:IUserData) {
    await prisma.user.create({data:user})
}

const authRepository = {
    insert
};

export default authRepository;