import { checkError } from "../middlewares/errorHandler";
import categoriesRepository from "../repositories/categoriesRepository";

async function getCategories(){
    return categoriesRepository.getCategories();
};

async function updateCategoryById(id:number,name:string) {
    const checkCategory = await categoriesRepository.findCategoryById(id)

    if(!checkCategory) throw checkError(404, "Categoria não está cadastrada!");

    await categoriesRepository.update(id, name);

    return {
        id,
        name
    }
};

async function deleleCategoryById(id:number) {
    const checkCategory = await categoriesRepository.findCategoryById(id);

    if(!checkCategory) throw checkError(404, "Categoria não está cadastrada!");

    await categoriesRepository.remove(id);
};

async function addCategory(name:string) {
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