import { checkError } from "../middlewares/errorHandler";
import categoriesRepository from "../repositories/categoriesRepository";
import { IUserData } from "../types/authTypes";

async function getCategories(){
    return categoriesRepository.getCategories();
};

async function updateCategoryById(id:number, name:string, user:IUserData) {
    if(user.email !== process.env.ADMIN_EMAIL) throw checkError(401, "You shall not pass!!!");

    const checkCategory = await categoriesRepository.findCategoryById(id);

    if(!checkCategory) throw checkError(404, "Categoria não está cadastrada!");

    await categoriesRepository.update(id, name);

    return {
        id,
        name
    }
};

async function deleleCategoryById(id:number, user:IUserData) {
    if(user.email !== process.env.ADMIN_EMAIL) throw checkError(401, "You shall not pass!!!");

    const checkCategory = await categoriesRepository.findCategoryById(id);

    if(!checkCategory) throw checkError(404, "Categoria não está cadastrada!");

    await categoriesRepository.remove(id);
};

async function addCategory(name:string, user:IUserData) {
    if(user.email !== process.env.ADMIN_EMAIL) throw checkError(401, "You shall not pass!!!");

    const checkCategory = await categoriesRepository.findCategoryByName(name);

    if(checkCategory) throw checkError(409, "Categoria já está cadastrada!");

    await categoriesRepository.insert(name);
}

const categoryServices = {
    getCategories,
    updateCategoryById,
    deleleCategoryById,
    addCategory
};

export default categoryServices;