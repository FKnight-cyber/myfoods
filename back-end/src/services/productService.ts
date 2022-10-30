import categoriesRepository from "../repositories/categoriesRepository";
import productsRepository from "../repositories/productsRepository";
import { checkError } from "../middlewares/errorHandler";
import { IProductData, IProductDataUpdate } from "../types/productTypes";
import { IUserData } from "../types/authTypes";

async function getProductsByCategoryName(category:string){
    const checkCategory = await categoriesRepository.findCategoryByName(category);

    if(!checkCategory) throw checkError(404,"Categoria não cadastrada!");

    const products = await productsRepository.findProductsByCategoryId(checkCategory.id);

    return products;
};

async function getAll() {
    return await productsRepository.getAllProducts();
};

async function addProduct(name:string, 
    image:string, category:string, 
    description:string, quantity:number, price:number, hasEdge:boolean, user:IUserData) {

        if(user.email !== process.env.ADMIN_EMAIL) throw checkError(401, "You shall not pass!!!");

        const checkCategory = await categoriesRepository.findCategoryByName(category);

        if(!checkCategory) throw checkError(404, "Categoria não registrada!");

        const product:IProductData = {
            name,
            imageURL:image,
            description,
            quantity,
            price,
            hasEdge,
            categoryId: checkCategory.id
        }
    
        await productsRepository.insert(product);
};

async function removeProduct(id:number, user:IUserData){
    if(user.email !== process.env.ADMIN_EMAIL) throw checkError(401, "You shall not pass!!!");

    const checkProduct = await productsRepository.findProductById(id);

    if(!checkProduct) throw checkError(404,"Produto não registrado!");

    await productsRepository.remove(id);
};

async function editProduct(name:string, 
    image:string,  
    description:string, 
    quantity:number, 
    price:number, 
    id:number,
    hasEdge:boolean,
    user:IUserData) {
        if(user.email !== process.env.ADMIN_EMAIL) throw checkError(401, "You shall not pass!!!");

        const checkProduct = await productsRepository.findProductById(id);

        if(!checkProduct) throw checkError(404,"Produto não registrado!");
    
        const product:IProductDataUpdate = {
            imageURL:image,
            description,
            quantity,
            price,
            hasEdge,
            name
        };

        return await productsRepository.update(id,product);
};

const productServices = {
    getProductsByCategoryName,
    addProduct,
    getAll,
    removeProduct,
    editProduct
};

export default productServices;