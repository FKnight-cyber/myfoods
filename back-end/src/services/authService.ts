import { IUserData, IUserLoginData, IUserInfo } from "../types/authTypes";
import authRepository from "../repositories/authRepository";
import { generateUserToken,encrypt,decrypt } from "../utils/authUtils";
import { checkError } from "../middlewares/errorHandler";

async function signUp(user:IUserData) {
    const checkUser = await authRepository.findUser(user.email);

    if(checkUser) throw checkError(409,"Este email já foi registrado!");

    user.password = encrypt(user.password);

    await authRepository.insert(user);
}

async function signIn(user:IUserLoginData) {
   const checkUser = await authRepository.findUser(user.email);

   if(!checkUser) throw checkError(404,"Este email não está registrado!");
   if(!decrypt(user.password, checkUser.password)) throw checkError(401,"Senha incorreta!");

   const userInfo:IUserInfo = {
        id:checkUser!.id,
        email:checkUser!.email,
        name:checkUser!.name,
        cep:checkUser!.cep,
        houseNumber:checkUser!.houseNumber
   };

   const token = generateUserToken(userInfo);

   return token;
}

const authServices = {
    signUp,
    signIn
}

export default authServices;

