import { checkError } from "../middlewares/errorHandler";
import districtsRepository from "../repositories/districtRepository";
import { IUserData } from "../types/authTypes";

async function getDistricts(){
    return districtsRepository.getRegions();
};

async function updateDistrictById(id:number, name:string, user:IUserData) {
    if(user.email !== process.env.ADMIN_EMAIL) throw checkError(401, "You shall not pass!!!");

    const checkDistrict = await districtsRepository.findRegionById(id);

    if(!checkDistrict) throw checkError(404, "Bairro não está cadastrado!");

    await districtsRepository.update(id, name);

    return {
        id,
        name
    }
};

async function removeDistrictById(id:number, user:IUserData) {
    if(user.email !== process.env.ADMIN_EMAIL) throw checkError(401, "You shall not pass!!!");

    const checkDistrict = await districtsRepository.findRegionById(id);

    if(!checkDistrict) throw checkError(404, "Bairro não está cadastrado!");

    await districtsRepository.remove(id);
};

async function addDistrict(name:string, user:IUserData) {
    if(user.email !== process.env.ADMIN_EMAIL) throw checkError(401, "You shall not pass!!!");

    const checkDistrict = await districtsRepository.findRegionByName(name);

    if(checkDistrict) throw checkError(409, "Bairro já está cadastrado!");

    await districtsRepository.insert(name);
}

const districtServices = {
    getDistricts,
    updateDistrictById,
    removeDistrictById,
    addDistrict
};

export default districtServices;