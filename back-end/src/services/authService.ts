import { IUserData, IUserLoginData, IUserInfo } from "../types/authTypes";
import authRepository from "../repositories/authRepository";
import districtsRepository from "../repositories/districtRepository";
import { generateUserToken, encrypt, decrypt } from "../utils/authUtils";
import { checkError } from "../middlewares/errorHandler";
import axios from "axios";

async function signUp(user:IUserData) {
    const checkUser = await authRepository.findUser(user.email);

    if(checkUser) throw checkError(409,"Este email já foi registrado!");

    if(user.email === process.env.ADMIN_EMAIL){
        await authRepository.insert({
            email: user.email,
            password: encrypt(user.password),
            cep: "00000000",
            houseNumber: "0000",
            name: `Admin ${user.name}`
        });

        console.log(user)

        return;
    }else{
        const { data:info } = await axios.get(`http://viacep.com.br/ws/${user.cep}/json/`).catch(()=>{
            throw checkError(500,"Erro na busca pelo seu CEP!");
        });
    
        const regions = await districtsRepository.getRegions();
        const validAddressDelivery = regions.map(region => region.name);
    
        if(info.erro) throw checkError(404,"Não encontramos informação do seu CEP, verifique novamente!");
    
        if(validAddressDelivery.includes(info.bairro) !== true) throw checkError(403,"Infelizmente não cobrimos a sua região ;(");
    
        user.password = encrypt(user.password);
    
        await authRepository.insert(user);
    }
};

async function signIn(user:IUserLoginData) {
   const checkUser = await authRepository.findUser(user.email);

   if(!checkUser) throw checkError(404,"Este email não está registrado!");
   if(!decrypt(user.password, checkUser.password)) throw checkError(401,"Senha incorreta!");

   if(checkUser.email === process.env.ADMIN_EMAIL){
        const adminInfo:IUserInfo = {
            id:checkUser!.id,
            email:checkUser!.email,
            name:checkUser!.name,
            cep:checkUser!.cep,
            houseNumber:checkUser!.houseNumber
        };
        const token = generateUserToken(adminInfo);

        return [token,"admin"];
   }

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

async function getUserInfo(userInfo:any) {
    const { id, name, email, cep, houseNumber } = userInfo.data;

    const { data:info } = await axios.get(`http://viacep.com.br/ws/${cep}/json/`).catch(()=>{
        throw checkError(500,"Erro na busca pelo seu CEP!");
    });

    return {
        id,
        name,
        email,
        houseNumber,
        cep,
        district: info.bairro,
        road: info.logradouro,
        city: info.localidade
    }
}

const authServices = {
    signUp,
    signIn,
    getUserInfo
}

export default authServices;

