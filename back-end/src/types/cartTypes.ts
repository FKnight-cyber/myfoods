import { Cart } from "@prisma/client";

export type ICartData = Omit<Cart, "id">;