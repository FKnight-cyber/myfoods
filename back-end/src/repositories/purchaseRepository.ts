import prisma from "../database";

async function insert(userId:number, productId:number) {
    console.log(userId)
    console.log(productId)
    await prisma.purchase.create({data:{
        userId,
        productId: productId - 1
    }});
};

async function getUserPurchases(userId:number) {
    return await prisma.purchase.findMany({where:{userId}});
};

async function getPurchasesPerDay(dateInit:Date, dateEnd:Date) {
    return await prisma.purchase.findMany(
        {
            where:{
                createdAt:{
                    gte: new Date(`${dateInit}`),
                    lt: new Date(`${dateEnd}`)
                }
            }
        });
}

const purchaseRepository = {
    insert,
    getUserPurchases,
    getPurchasesPerDay
};

export default purchaseRepository;