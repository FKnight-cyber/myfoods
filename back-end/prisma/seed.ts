import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const edges = [
    {id:1, name: 'Chocolate', price: 500},
    {id:2, name: 'Cheddar', price: 250},
    {id:3, name: 'Catupiry', price: 250}
];

const regions = [
    {name: 'Parangaba'},
    {name: 'Vila Peri'},
    {name: 'Novo Mondubim'},
    {name: 'Parque São José'},
    {name: 'Manoel Sátiro'},
    {name: 'Conjunto Esperança'},
    {name: 'Parque Santa Rosa'},
    {name: 'Parque Presidente Vargas'},
    {name: 'Canindezinho'},
    {name: 'Bom Jardim'}
]

const categories = [
    {id:1, name: 'Pizzas'},
    {id:2, name: 'Bebidas'},
    {id:3, name: 'Promoções'}
]

const products = [
    {
        id:1,
        name:'Pizza Calabresa', 
        price:3700, 
        description: 'Mussarela, calabresa, cebola e molho de tomate especial!',
        categoryId:1,
        quantity:10,
        imageURL: 'https://t2.rg.ltmcdn.com/pt/posts/9/8/3/pizza_calabresa_e_mussarela_4389_600.jpg'
    },
    {
        id:2,
        name:'Pizza Mussarela', 
        price:3200, 
        description: 'Bastante mussarela!',
        categoryId:1,
        quantity:7,
        imageURL: 'https://www.receiteria.com.br/wp-content/uploads/receitas-de-pizza-de-mussarela-1.jpg'
    },
    {
        id:3,
        name:'Pizza de Chocolate', 
        price:4100, 
        description: 'Mussarela, chocolate, morango e leite condensado!',
        categoryId:1,
        quantity:13,
        imageURL: 'https://xtudoreceitas.com/wp-content/uploads/Pizza-de-Chocolate-com-Morango.jpg'
    },
    {
        id:4,
        name:'Pizza de Abacaxi', 
        price:3250, 
        description: 'Mussarela com abacaxi caramelizado!',
        categoryId:1,
        quantity:15,
        imageURL: 'https://www.manollopizzaria.com.br/wp-content/uploads/2015/02/abacaxi-e1427244937949.jpg'
    },
    {
        id:5,
        name:'Spicy Beef Pizza', 
        price:5500, 
        description: 'Blend bovino, cebola, pimenta biquinho e molho especial!',
        categoryId:1,
        quantity:16,
        imageURL: 'https://storcpdkenticomedia.blob.core.windows.net/media/recipemanagementsystem/media/recipe-media-files/recipes/retail/x17/18631-hamburger-caramelized-onion-pizza-600x600.jpg?ext=.jpg'
    },
    {
        id:6,
        name:'Coca-cola 2l', 
        price:1500, 
        description: 'refrigerante',
        categoryId:2,
        quantity:30,
        imageURL: 'https://www.paodeacucar.com/img/uploads/1/643/20247643.jpg'
    },
    {
        id:7,
        name:'Fanta morango', 
        price:1500, 
        description: 'refrigerante',
        categoryId:2,
        quantity:30,
        imageURL: 'https://io.convertiez.com.br/m/superpaguemenos/shop/products/images/48943/medium/refrig-fanta-2l-pet-tutti-frutti_95100.png'
    },
    {
        id:8,
        name:'Fanta maçã verde', 
        price:1500, 
        description: 'refrigerante',
        categoryId:2,
        quantity:30,
        imageURL: 'https://d3o3bdzeq5san1.cloudfront.net/4/3004.jpg'
    },
    {
        id:9,
        name:'Pizza Mussarela', 
        price:2200, 
        description: 'Bastante mussarela!',
        categoryId:3,
        quantity:7,
        imageURL: 'https://www.receiteria.com.br/wp-content/uploads/receitas-de-pizza-de-mussarela-1.jpg'
    },
    {
        id:10,
        name:'Fanta maçã verde', 
        price:1000, 
        description: 'refrigerante',
        categoryId:3,
        quantity:5,
        imageURL: 'https://d3o3bdzeq5san1.cloudfront.net/4/3004.jpg'
    },
    {
        id:11,
        name:'Pizza de Abacaxi', 
        price:2250, 
        description: 'Mussarela com abacaxi caramelizado!',
        categoryId:3,
        quantity:15,
        imageURL: 'https://www.manollopizzaria.com.br/wp-content/uploads/2015/02/abacaxi-e1427244937949.jpg'
    }
]

async function main() {

    await createEdges();  
    await createCategories();
    await createRegions();
    await createProducts();

};

async function createCategories() {
    for(const category of categories){
        await prisma.category.upsert({
            where:{id:category.id},
            update:category,
            create:category
        })
    }
};

async function createEdges() {
    for(const edge of edges){
        await prisma.pizzaEdges.upsert({
            where:{id:edge.id},
            update:edge,
            create:edge
        })
    }
};

async function createProducts() {
    for(const product of products){
        await prisma.product.upsert({
            where:{id:product.id},
            update:product,
            create:product
        })
    }
};

async function createRegions() {
    for(const region of regions){
        await prisma.regions.upsert({
            where:{name:region.name},
            update:region,
            create:region
        })
    }
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });