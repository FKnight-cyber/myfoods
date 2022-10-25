import prisma from "../database";

async function insert(name:string){
    await prisma.regions.create({data:{name}});
};

async function getRegions() {
    return await prisma.regions.findMany({});
};

async function findRegionById(id:number) {
    return await prisma.regions.findUnique({where:{id}});
};

async function findRegionByName(name:string) {
    return await prisma.regions.findFirst({where:{name}});
};

async function update(id:number,name:string){
    await prisma.regions.update({
        where:{
            id
        },
        data:{
            name
        }
    })
};

async function remove(id:number) {
    await prisma.regions.delete({where:{id}});
};

const districtsRepository = {
    insert,
    getRegions,
    findRegionById,
    findRegionByName,
    update,
    remove
};

export default districtsRepository;