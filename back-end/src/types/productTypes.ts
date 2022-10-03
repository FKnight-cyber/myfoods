import { Product } from "@prisma/client";

export type IProductData = Omit<Product, "createdAt" | "id">;
export type IProductDataUpdate = Omit<Product, "createdAt" | "id" | "categoryId">;