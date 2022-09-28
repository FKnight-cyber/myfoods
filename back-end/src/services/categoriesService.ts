import categoriesRepository from "../repositories/categoriesRepository";

async function getCategories(){
    return categoriesRepository.getCategories();
}

const categoryServices = {
    getCategories
};

export default categoryServices;