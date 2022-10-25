import { Request, Response } from "express";
import districtServices from "../services/districtsService";

export async function getDistricts(req:Request, res:Response) {

    const districts = await districtServices.getDistricts();
    
    res.status(200).send(districts);
};

export async function editDistrict(req:Request, res:Response){
    const { userInfo } = res.locals;

    const id:number = Number(req.params.id);
    const name:string = req.body.name;

    const district = await districtServices.updateDistrictById(id, name, userInfo.data);
    
    res.status(200).send(district);
};

export async function removeDistrict(req:Request, res:Response){
    const { userInfo } = res.locals;

    const id:number = Number(req.params.id);

    await districtServices.removeDistrictById(id, userInfo.data);

    res.sendStatus(200);
};

export async function addDistrict(req:Request, res:Response) {
    const { userInfo } = res.locals;

    const name:string = req.body.name;

    await districtServices.addDistrict(name, userInfo.data);

    res.sendStatus(201);
}