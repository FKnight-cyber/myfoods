import categoriesRepository from "../repositories/categoriesRepository";
import productsRepository from "../repositories/productsRepository";
import { checkError } from "../middlewares/errorHandler";
import { IProductData } from "../types/productTypes";

async function getProductsByCategoryName(category:string){
    const checkCategory = await categoriesRepository.findCategoryByName(category);

    if(!checkCategory) throw checkError(404,"Categoria não cadastrada!");

    const products = await productsRepository.findProductsByCategoryId(checkCategory.id);

    return products;
};

async function addProduct(name:string, 
    image:string, category:string, 
    description:string, quantity:number, price:number) {

        const checkCategory = await categoriesRepository.findCategoryByName(category);

        if(!checkCategory) throw checkError(404, "Categoria não registrada!");

        const product:IProductData = {
            name,
            imageURL:image,
            description,
            quantity,
            price,
            categoryId: checkCategory.id
        }
    
        await productsRepository.insert(product);
}

const productServices = {
    getProductsByCategoryName,
    addProduct
};

export default productServices;