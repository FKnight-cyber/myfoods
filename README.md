# projeto MyFoods
MyFoods targets small business food delivery service, it allows product and client management and a simply and fast way to order food.

<p align="center">
  <img  src="https://comer-gravida.net/wp-content/uploads/2019/10/pizza7.png">
</p>
<h1 align="center">
  MyFoods
</h1>
<div align="center">

  <h3>Built With</h3>

  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" height="30px"/>  
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express.js&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/Prisma-316192?style=for-the-badge&logo=prisma&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/Jest-316192?style=for-the-badge&logo=jest&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/Cypress-316192?style=for-the-badge&logo=cypress&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/React-316192?style=for-the-badge&logo=react&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/Styled-components-316192?style=for-the-badge&logo=styled-components&logoColor=white" height="30px"/>
  
  <!-- Badges source: https://dev.to/envoy_/150-badges-for-github-pnk -->
</div>

<br/>

# Description

The idea of this project was to build something of my own, it might not be the most original one but represents something that i use almost everyday,
and so i choose to create my small version of a food delivery app, i took inspiration on iFood.

The site has two parts, one for the admin, there he can manage all categories and products whole CRUD logic.
The second part deal with the consumers, here the client can check products ordered by category, he can also add products to cart before finish his purchase and see his address info on user page.
On cart page he can remove a single product or clean it.
When finish purchase a pop-up will appear with all purchase and delivery information, the consumer will add his number on a field-box and then confirm, it will redirect the message to WhatsApp Web and send to the store.

On this version only CEPs of the city of Fortaleza are allowed but you can easily add/remove out of delivery range areas through .env .

</br>

## Features

-   Client and Admin sign-up and sign-in.
-   Client's info page.
-   Purchases info page.
-   CRUD categories and products.
-   View and remove cart products.
-   Finish order request through WhatsApp web.

</br>

## API Reference

I've utilized the viacep.com.br API, with that the site does only need user's CEP and house number, since this API provides all necessary address info,
requesting only the CEP.

### User Sign Up

```
https://myfoods-vieira.herokuapp.com
POST /sign-up
```

#### Request:

| Body            | Type     | Description                     |
| :-------------- | :------- | :------------------------------ |
| `name`          | `string` | **Required**. user name         |
| `cep`           | `string` | **Required**. user cep          |
| `houseNumber`   | `string` | **Required**. user houseNumber  |
| `email`         | `string` | **Required**. user email        |
| `password`      | `string` | **Required**. user password     |

#### Response:

```
status: 201
```

`the sign-up system can be adjusted to register users in a specific region by validating their CEP` 

#

### User Sign In

```
https://myfoods-vieira.herokuapp.com
POST /sign-in
```

#### Request:

| Body            | Type     | Description                     |
| :-------------- | :------- | :------------------------------ |
| `email`         | `string` | **Required**. user email        |
| `password`      | `string` | **Required**. user password     |

#### Response:

```json
{
  "token": "jwt authorization token"
}
```

#

### Get user info

```
https://myfoods-vieira.herokuapp.com
GET /user/info
```

#### Request:

| Headers          | Type    | Description                        |
| :--------------- | :-------| :--------------------------------- |
| `x-access-token` | `string`| **Required**. authentication token | 

#### Response:

```json
{
  "id": 3,
  "name": "Fulano de Tal",
  "email": "fulano@gmail.com",
  "houseNumber": "1234",
  "cep": "60720096",
  "district": "Parangaba",
  "road": "Rua Cônego de Castro",
  "city": "Fortaleza"
}
```

#

### Get user purchases info

```
https://myfoods-vieira.herokuapp.com
GET /user/purchase/info
```

#### Request:

| Headers          | Type    | Description                        |
| :--------------- | :-------| :--------------------------------- |
| `x-access-token` | `string`| **Required**. authentication token |

#### Response:

```json
[
  {
    "id": 1,
    "userId": 2,
    "productId": 1,
    "createdAt": "2022-10-09T13:49:07.065Z"
  },
  {
    "id": 2,
    "userId": 2,
    "productId": 2,
    "createdAt": "2022-10-09T13:49:07.079Z"
  },
  {
    "id": 3,
    "userId": 2,
    "productId": 3,
    "createdAt": "2022-10-09T14:18:26.830Z"
  },
  {
    "id": 4,
    "userId": 2,
    "productId": 2,
    "createdAt": "2022-10-09T14:18:26.842Z"
  },
  ...
]
```

#

### Get daily purchases info

```
https://myfoods-vieira.herokuapp.com
POST /admin/purchase/info
```

#### Request:

| Headers          | Type    | Description                        |
| :--------------- | :-------| :--------------------------------- |
| `x-access-token` | `string`| **Required**. authentication token |

###

| Body                     | Type      | Description                  |
| :----------------------- | :-------- | :--------------------------- |
| `dateInit`               | `string`  | **Required**. target day     |
| `dateEnd`                | `string`  | **Required**.  next day      |

#### Response:

```json
[
  {
    "id": 1,
    "userId": 3,
    "productId": 1,
    "createdAt": "2022-10-09T13:49:07.065Z"
  },
  {
    "id": 2,
    "userId": 2,
    "productId": 1,
    "createdAt": "2022-10-09T13:49:07.079Z"
  },
  {
    "id": 3,
    "userId": 2,
    "productId": 3,
    "createdAt": "2022-10-09T14:18:26.830Z"
  },
  {
    "id": 4,
    "userId": 2,
    "productId": 2,
    "createdAt": "2022-10-09T14:18:26.842Z"
  },
  ...
]
```

#

### Create a new category

```
https://myfoods-vieira.herokuapp.com/
POST /categories/create
```

#### Request:

| Headers          | Type    | Description                        |
| :--------------- | :-------| :--------------------------------- |
| `x-access-token` | `string`| **Required**. authentication token | 

####

| Body                     | Type      | Description                             |
| :----------------------- | :-------- | :-------------------------------------- |
| `name`                   | `string`  | **Required**. category name             |


####

</br>

#### Response:

```json
status: 201
```

`Only admin has permission to create categories`

#

### View categories.

```
https://myfoods-vieira.herokuapp.com
GET /categories
```

#### Request:

| Headers          | Type    | Description                        |
| :--------------- | :-------| :--------------------------------- |
| `x-access-token` | `string`| **Required**. authentication token |

####

#### Response:

```json
[
  {
    "id": 1,
    "name": "Bebidas",
    "createdAt": "2022-10-04T18:02:18.822Z"
  },
  {
    "id": 2,
    "name": "Sucos",
    "createdAt": "2022-10-05T02:20:39.442Z"
  },
  {
    "id": 3,
    "name": "Pizzas",
    "createdAt": "2022-10-02T15:02:38.277Z"
  },
  ...
]
```
#

### Edit category

```
https://myfoods-vieira.herokuapp.com
PATCH /categories/:id
```

#### Request:

| Headers          | Type    | Description                        |
| :--------------- | :-------| :--------------------------------- |
| `x-access-token` | `string`| **Required**. authentication token |

####

| Params  | Type     | Description              |
| :------ | :------- | :----------------------- |
| `id`    | `integer`| **Required**. categoryId |

####

| Body    | Type     | Description                 |
| :------ | :------- | :-------------------------- |
| `name`  | `string` | **Required**. category name |

#### Response:

```json
  {
    "id": 1,
    "name": "edited name",
    "createdAt": "2022-10-02T15:02:38.277Z"
  }
```
`Only admin has permission to create categories`

#

### Delete category

```
https://myfoods-vieira.herokuapp.com
DELETE /categories/delete/:id
```

#### Request:

| Headers          | Type    | Description                        |
| :--------------- | :-------| :--------------------------------- |
| `x-access-token` | `string`| **Required**. authentication token |

####

| Params  | Type     | Description              |
| :------ | :------- | :----------------------- |
| `id`    | `integer`| **Required**. categoryId |

#### Response:

```
status: 202
```
`Only admin has permission to create categories`

#

### View products by category

```
https://myfoods-vieira.herokuapp.com
GET /products?category=
```

#### Request:

| Headers          | Type    | Description                        |
| :--------------- | :-------| :--------------------------------- |
| `x-access-token` | `string`| **Required**. authentication token |

####

| Params     | Type     | Description                 |
| :--------- | :------- | :-------------------------- |
| `category` | `string` | **Required**. category name |

#### Response:

```json
[
  {
    "id": 7,
    "name": "Super mussarela",
    "price": 3750,
    "description": "awhduahdihawdhiuahdiuahwiudhiawhdiuahwdiuahiwdhaiwhdiauwhdiauwhdiauwhdauwdiuahwdahwduhaiuwdhiauwdh",
    "categoryId": 1,
    "createdAt": "2022-10-03T11:41:25.266Z",
    "quantity": 15,
    "imageURL": "https://conteudo.imguol.com.br/c/entretenimento/3e/2022/07/08/pizza-com-queijo-derretido-1657298020291_v2_1170x540.jpg"
  },
  {
    "id": 6,
    "name": "Pizza Mussarela Gigante",
    "price": 4000,
    "description": "Uma pizza com bastante queijo",
    "categoryId": 1,
    "createdAt": "2022-10-03T00:40:39.798Z",
    "quantity": 2,
    "imageURL": "https://img.itdg.com.br/tdg/images/recipes/000/093/498/323883/323883_original.jpg"
  },
  ...
]
```
`Products with quantity equal 0 will not be listed`

#

### View all products

```
https://myfoods-vieira.herokuapp.com
GET /products/all
```

#### Request:

| Headers          | Type    | Description                        |
| :--------------- | :-------| :--------------------------------- |
| `x-access-token` | `string`| **Required**. authentication token |

####

#### Response:

```json
[
  {
    "id": 1,
    "name": "Super mussarela",
    "price": 3750,
    "description": "Uma pizza com bastante mussarela",
    "categoryId": 1,
    "createdAt": "2022-10-03T11:41:25.266Z",
    "quantity": 12,
    "imageURL": "https://conteudo.imguol.com.br/c/entretenimento/3e/2022/07/08/pizza-com-queijo-derretido-1657298020291_v2_1170x540.jpg"
  },
  {
    "id": 2,
    "name": "Guaraná",
    "price": 1200,
    "description": "Refrigerante de guaraná",
    "categoryId": 2,
    "createdAt": "2022-10-03T00:40:39.798Z",
    "quantity": 2,
    "imageURL": "https://img.itdg.com.br/tdg/images/recipes/000/093/498/323883/323883_original.jpg"
  },
  ...
]
```
`Products with quantity equal 0 will not be listed`

#

### Create new product

```
https://myfoods-vieira.herokuapp.com
POST /products/create
```

#### Request:

| Headers          | Type    | Description                        |
| :--------------- | :-------| :--------------------------------- |
| `x-access-token` | `string`| **Required**. authentication token |

####

| Body          | Type    | Description                           |
| :--------------- | :-------| :--------------------------------- |
| `imageURL`    | `string`  | **Required**. product's image       |
| `category`    | `string`  | **Required**. product's category    |
| `name`        | `string`  | **Required**. product's name        |
| `description` | `string`  | **Required**. product's description |
| `quantity`    | `integer` | **Required**. quantity in stock     |
| `price`       | `integer` | **Required**. product's price       |

#### Response:

```
status: 201
```
`Only admin can create products`

#

### Edit product

```
https://myfoods-vieira.herokuapp.com
PATCH /products/edit/:id
```

#### Request:

| Headers          | Type    | Description                        |
| :--------------- | :-------| :--------------------------------- |
| `x-access-token` | `string`| **Required**. authentication token |

####

| Params  | Type     | Description             |
| :------ | :------- | :---------------------- |
| `id`    | `integer`| **Required**. productId |

####

| Body          | Type    | Description                           |
| :--------------- | :-------| :--------------------------------- |
| `imageURL`    | `string`  | **Optional**. product's image       |
| `category`    | `string`  | **Optional**. product's category    |
| `name`        | `string`  | **Optional**. product's name        |
| `description` | `string`  | **Optional**. product's description |
| `quantity`    | `integer` | **Optional**. quantity in stock     |
| `price`       | `integer` | **Optional**. product's price       |

#### Response:

```
status: 202
```
`Only admin can edit products`

#

### Delete product

```
https://myfoods-vieira.herokuapp.com
DELETE /products/delete/:id
```

#### Request:

| Headers          | Type    | Description                        |
| :--------------- | :-------| :--------------------------------- |
| `x-access-token` | `string`| **Required**. authentication token |

####

| Params  | Type     | Description             |
| :------ | :------- | :---------------------- |
| `id`    | `integer`| **Required**. productId |

#### Response:

```
status: 202
```
`Only admin can remove products`

#

### Add to cart

```
https://myfoods-vieira.herokuapp.com
POST /cart/add
```

#### Request:

| Headers          | Type    | Description                        |
| :--------------- | :-------| :--------------------------------- |
| `x-access-token` | `string`| **Required**. authentication token |

####

| Body          | Type    | Description                         |
| :--------------- | :-------| :------------------------------- |
| `quantity`    | `integer` | **Required**. quantity in stock   |
| `productId`   | `integer` | **Required**. product's id        |

#### Response:

```
status: 201
```

#

### View cart products

```
https://myfoods-vieira.herokuapp.com
GET /cart/list
```

#### Request:

| Headers          | Type    | Description                        |
| :--------------- | :-------| :--------------------------------- |
| `x-access-token` | `string`| **Required**. authentication token |

####

#### Response:

```json
[
  [
    {
      "id": 4,
      "userId": 3,
      "productId": 7,
      "quantity": 1,
      "products": {
        "name": "Super mussarela",
        "price": 3750,
        "description": "awhduahdihawdhiuahdiuahwiudhiawhdiuahwdiuahiwdhaiwhdiauwhdiauwhdiauwhdauwdiuahwdahwduhaiuwdhiauwdh",
        "imageURL": "https://conteudo.imguol.com.br/c/entretenimento/3e/2022/07/08/pizza-com-queijo-derretido-1657298020291_v2_1170x540.jpg",
        "categoryId": 1
      }
    },
    {
      "id": 5,
      "userId": 3,
      "productId": 8,
      "quantity": 1,
      "products": {
        "name": "Marguerita",
        "price": 6300,
        "description": "awhduahdihawdhiuahdiuahwiudhiawhdiuahwdiuahiwdhaiwhdiauwhdiauwhdiauwhdauwdiuahwdahwduhaiuwdhiauwdhawhduahdihawdhiuahdiuahwiudhiawhdiuahwdiuahiwdhaiwhdiauwhdiauwhdiauwhdauwdiuahwdahwduhaiuwdhiauwdhawhduahdihawdhiuahdiuahwiudhiawhdiuahwdiuahiwdhaiwhdiauwhdiauwhdiauwhdauwdiuahwdahwduhaiuwdhiauwdh",
        "imageURL": "https://media.gqmagazine.fr/photos/5d8b7254c7191e00083ebdbb/4:3/w_1440,h_1080,c_limit/como%20hacer%20la%20mejor%20pizza%20del%20mundo.jpg",
        "categoryId": 1
      }
    },
    ...
  ],
  17550
]
```

#

### Remove product from cart

```
https://myfoods-vieira.herokuapp.com
DELETE /cart/remove?product=${productId}&item=${id}&quantity=${quantity}
```

#### Request:

| Headers          | Type    | Description                        |
| :--------------- | :-------| :--------------------------------- |
| `x-access-token` | `string`| **Required**. authentication token |

####

| Params  | Type     | Description                                |
| :------ | :------- | :----------------------------------------- |
| `product`   | `integer`| **Required**. productId                |
| `item`      | `integer`| **Required**. cart item id             |
| `quantity`  | `integer`| **Required**. product quantity in cart |

#### Response:

```
status: 200
```

#

### Remove all products from cart

```
https://myfoods-vieira.herokuapp.com
DELETE /cart/cancel
```

#### Request:

| Headers          | Type    | Description                        |
| :--------------- | :-------| :--------------------------------- |
| `x-access-token` | `string`| **Required**. authentication token |

####

#### Response:

```
status: 200
```

#

### Clean cart after purchase

```
https://myfoods-vieira.herokuapp.com
DELETE /cart/clean
```

#### Request:

| Headers          | Type    | Description                        |
| :--------------- | :-------| :--------------------------------- |
| `x-access-token` | `string`| **Required**. authentication token |

####

#### Response:

```
status: 200
```

#

### Route used by cypress to clean user table for test purposes

```
http://localhost:5000
DELETE /test/users/clear
```

#### Request:

####

#### Response:

```
status: 203
```

# 

## Environment Variables

To run this project, you will need to add the following environment variables to your back-.env file

`DATABASE_URL = postgres://UserName:Password@Hostname:5432/DatabaseName`

`PORT = number #recommended:5000`

`JWT_SECRET = string `

`ADMIN_EMAIL = email used to access administrative area `

`NODE_ENV = string #prod by default `

`DELIVERY_RANGE = string default Fortaleza, does accept list of cities format example: Fortaleza, Caucaia, Maracanaú, ... `



front-end/.env

`REACT_APP_API_BASE_URL = example: http://localhost:5000`

`REACT_APP_WHATSAPP_NUMBER = string store's full phone number`

To test this project, you will need to add the following environment variables to your back-end/.env.test file

`DATABASE_URL = postgres://UserName:Password@Hostname:5432/DatabaseName`

`ADMIN_EMAIL = email used to access administrative area `

`NODE_ENV = string test `


</br>

## Run Locally

Clone the project

```bash
  git clone https://github.com/FKnight-cyber/myfoods
```

Go to the project directory

```bash
  cd https://github.com/FKnight-cyber/myfoods/back-end
```

```bash
  cd https://github.com/FKnight-cyber/myfoods/front-end
```

Install dependencies

```bash
  npm install
```

Create database

The application is currently deployed on Heroku, but if you want to run it locally...

cd ../../myfoods/back-end

check your .env and inform your variables.

```bash
  npm run prisma:migrate 
```

and prisma will build the postgress database.

Start the server

```bash
  npm run dev
```

Run all tests

```bash
  npm test
```

Run integration tests

```bash
  npm run test:integration
```

Run unit tests

```bash
  npm run test:unit
```

Run cypress tests

```bash
  cd ../../myfoods/front-end
```

```bash
  npx cypress open
```

prisma will build another postgress database for test purposes.
</br>

## Lessons Learned

In this project i've improved my skills, like tests were more easier and fast, i've also used new and cool libs like @mui/material and learnt about social media APIs.

</br>

## Acknowledgements

-   [Awesome Badges](https://github.com/Envoy-VC/awesome-badges)

</br>

## Authors

-   Ryan Nicholas is a student at Driven Education and is putting effort into it to become a Dev.
<br/>

#