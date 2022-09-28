import categoriesRepository from "../repositories/categoriesRepository";
import productsRepository from "../repositories/productsRepository";
import { checkError } from "../middlewares/errorHandler";

async function getProductsByCategoryName(category:string){
    const checkCategory = await categoriesRepository.findCategoryByName(category);

    if(!checkCategory) throw checkError(404,"Categoria não cadastrada!");

    const products = await productsRepository.findProductsByCategoryId(checkCategory.id);

    return products;
}

const productServices = {
    getProductsByCategoryName
};

export default productServices;