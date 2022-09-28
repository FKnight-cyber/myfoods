import { User } from "@prisma/client";

export type IUserData = Omit<User, "id" | "createdAt">;
export type IUserLoginData = Omit<User, "id" | "createdAt" | "name" | "cep" | "houseNumber">;
export type IUserInfo = Omit<User, "createdAt" | "password">;