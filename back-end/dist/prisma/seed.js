"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    await createCategories();
    await createRegions();
    await createProducts();
}
;
async function createCategories() {
    await prisma.category.createMany({
        data: [
            { id: 1, name: 'Pizzas' },
            { id: 2, name: 'Bebidas' }
        ]
    });
}
;
async function createProducts() {
    await prisma.product.createMany({
        data: [
            {
                name: 'Pizza Calabresa',
                price: 3700,
                description: 'Mussarela, calabresa, cebola e molho de tomate especial!',
                categoryId: 1,
                quantity: 10,
                imageURL: 'https://t2.rg.ltmcdn.com/pt/posts/9/8/3/pizza_calabresa_e_mussarela_4389_600.jpg'
            },
            {
                name: 'Pizza Mussarela',
                price: 3200,
                description: 'Bastante mussarela!',
                categoryId: 1,
                quantity: 7,
                imageURL: 'https://www.receiteria.com.br/wp-content/uploads/receitas-de-pizza-de-mussarela-1.jpg'
            },
            {
                name: 'Pizza de Chocolate',
                price: 4100,
                description: 'Mussarela, chocolate, morango e leite condensado!',
                categoryId: 1,
                quantity: 13,
                imageURL: 'https://xtudoreceitas.com/wp-content/uploads/Pizza-de-Chocolate-com-Morango.jpg'
            },
            {
                name: 'Pizza de Abacaxi',
                price: 3250,
                description: 'Mussarela com abacaxi caramelizado!',
                categoryId: 1,
                quantity: 15,
                imageURL: 'https://www.manollopizzaria.com.br/wp-content/uploads/2015/02/abacaxi-e1427244937949.jpg'
            },
            {
                name: 'Spicy Beef Pizza',
                price: 5500,
                description: 'Blend bovino, cebola, pimenta biquinho e molho especial!',
                categoryId: 1,
                quantity: 16,
                imageURL: 'https://storcpdkenticomedia.blob.core.windows.net/media/recipemanagementsystem/media/recipe-media-files/recipes/retail/x17/18631-hamburger-caramelized-onion-pizza-600x600.jpg?ext=.jpg'
            },
            {
                name: 'Coca-cola 2l',
                price: 1500,
                description: 'refrigerante',
                categoryId: 2,
                quantity: 30,
                imageURL: 'https://www.paodeacucar.com/img/uploads/1/643/20247643.jpg'
            },
            {
                name: 'Fanta morango',
                price: 1500,
                description: 'refrigerante',
                categoryId: 2,
                quantity: 30,
                imageURL: 'https://io.convertiez.com.br/m/superpaguemenos/shop/products/images/48943/medium/refrig-fanta-2l-pet-tutti-frutti_95100.png'
            },
            {
                name: 'Fanta maçã verde',
                price: 1500,
                description: 'refrigerante',
                categoryId: 2,
                quantity: 30,
                imageURL: 'http://2.bp.blogspot.com/-d5A0Vb2PNr0/VXYHTTS7euI/AAAAAAAAA50/3toPIoMtOtE/s1600/maca.JPG'
            }
        ]
    });
}
;
async function createRegions() {
    await prisma.regions.createMany({
        data: [
            { name: 'Parangaba' },
            { name: 'Vila Peri' },
            { name: 'Novo Mondubim' },
            { name: 'Parque São José' },
            { name: 'Manoel Sátiro' },
            { name: 'Conjunto Esperança' },
            { name: 'Parque Santa Rosa' },
            { name: 'Parque Presidente Vargas' },
            { name: 'Canindezinho' },
            { name: 'Bom Jardim' }
        ]
    });
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
