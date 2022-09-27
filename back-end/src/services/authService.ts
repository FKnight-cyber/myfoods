import { IUserData, IUserLoginData, IUserInfo } from "../types/authTypes";
import authRepository from "../repositories/authRepository";
import { generateUserToken } from "../utils/authUtils";

async function signUp(user:IUserData) {
    await authRepository.insert(user)
}

async function signIn(user:IUserLoginData) {
   const checkUser = await authRepository.findUser(user.email);

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

