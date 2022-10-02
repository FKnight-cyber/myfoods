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

const categoryServices = {
    getCategories,
    updateCategoryById,
    deleleCategoryById
};

export default categoryServices;