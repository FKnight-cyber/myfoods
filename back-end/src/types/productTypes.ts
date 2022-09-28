import { Product } from "@prisma/client";

export type IProductData = Omit<Product, "createdAt">;