import { IUserData, IUserLoginData, IUserInfo } from "../types/authTypes";
import authRepository from "../repositories/authRepository";
import { generateUserToken,encrypt,decrypt } from "../utils/authUtils";
import { checkError } from "../middlewares/errorHandler";
import axios from "axios";

async function signUp(user:IUserData) {
    const checkUser = await authRepository.findUser(user.email);

    if(checkUser) throw checkError(409,"Este email já foi registrado!");

    const { data:info } = await axios.get(`http://viacep.com.br/ws/${user.cep}/json/`).catch(()=>{
        throw checkError(500,"Erro na busca pelo seu CEP!");
    });

    const validAddressDelivery = {
        Parangaba:true
    };

    if(info.erro) throw checkError(404,"Não encontramos informação do seu CEP, verifique novamente!");

    if(validAddressDelivery[info.bairro] !== true) throw checkError(401,"Infelizmente não cobrimos o seu bairro ;(");

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

