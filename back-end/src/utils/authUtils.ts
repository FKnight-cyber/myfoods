import jwt from "jsonwebtoken";
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
