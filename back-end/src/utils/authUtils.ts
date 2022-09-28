import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { IUserInfo } from "../types/authTypes";

dotenv.config();

export function generateUserToken(data:IUserInfo){
    const secret:string = process.env.JWT_SECRET || "";
    return (
        jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 6), //expires in 6h
            data
          }, secret)
    );
};

export function encrypt(password:string){
    return bcrypt.hashSync(password,10);
}

export function decrypt(password:string, hashPassword:string){
    return bcrypt.compareSync(password, hashPassword);
}