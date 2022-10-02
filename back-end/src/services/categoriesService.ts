import { checkError } from "../middlewares/errorHandler";
import categoriesRepository from "../repositories/categoriesRepository";

async function getCategories(){
    return categoriesRepository.getCategories();
}

async function updateCategoryById(id:number,name:string) {
    const checkCategory = categoriesRepository.findCategoryById(id)

    if(!checkCategory) throw checkError(404, "Categoria não está cadastrada!");

    await categoriesRepository.update(id, name);

    return {
        id,
        name
    }
}

const categoryServices = {
    getCategories,
    updateCategoryById
};

export default categoryServices;