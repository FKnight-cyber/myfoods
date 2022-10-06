import { Request, Response } from "express";
import prisma from "../database";

export default async function cleanUsersTable(req:Request, res:Response){
    await prisma.user.deleteMany({});
    res.sendStatus(203);
}