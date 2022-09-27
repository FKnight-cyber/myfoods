import { IUserData } from "../types/authTypes";
import authRepository from "../repositories/authRepository";

async function signUp(user:IUserData) {
    await authRepository.insert(user)
}

const authServices = {
    signUp
}

export default authServices;

