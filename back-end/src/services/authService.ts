import { IUserData, IUserLoginData, IUserInfo } from "../types/authTypes";
import authRepository from "../repositories/authRepository";
import { generateUserToken } from "../utils/authUtils";
import { checkError } from "../middlewares/errorHandler";

async function signUp(user:IUserData) {
    const checkUser = await authRepository.findUser(user.email);

    if(checkUser) throw checkError(409,"Este email já foi registrado!");

    await authRepository.insert(user);
}

async function signIn(user:IUserLoginData) {
   const checkUser = await authRepository.findUser(user.email);

   if(!checkUser) throw checkError(404,"Este email não está registrado!");

   const userInfo:IUserInfo = {
        id:checkUser!.id,
        email:checkUser!.email,
        name:checkUser!.name,
        address:checkUser!.address
   };

   const token = generateUserToken(userInfo);

   return token;
}

const authServices = {
    signUp,
    signIn
}

export default authServices;

