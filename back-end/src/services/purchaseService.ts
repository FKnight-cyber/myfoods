import purchaseRepository from "../repositories/purchaseRepository";
import { checkError } from "../middlewares/errorHandler";

async function purchase(userId:number, products:number[]){
    for( const productId of products){
        await purchaseRepository.insert(userId, productId);
    }
};

async function getUserInfo(userId:number) {
    return await purchaseRepository.getUserPurchases(userId);
};

async function getDailyInfo(user:any, dateInit:Date, dateEnd:Date) {
    if(user.email !== process.env.ADMIN_EMAIL) throw checkError(401, "You shall not pass!!!");

    return await purchaseRepository.getPurchasesPerDay(dateInit,dateEnd);
}

const purchaseServices = {
    purchase,
    getUserInfo,
    getDailyInfo
};

export default purchaseServices;