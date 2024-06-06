import { scrapeZillow } from "../services/scrape/scrapeZillow.ts";
import { Request } from "express";
import { Response } from "express";

export const scrapeListings = async (req:Request,res:Response)=>{
    const {city,maxPrice,pageNum} = req.body;
    if(!city || isNaN(Number(pageNum)) || isNaN(Number(maxPrice))){
        return res.status(400).send({error:"Need all parameters in request body"});
    }
    try{
        const response = await scrapeZillow(city,maxPrice,pageNum);
        return res.status(200).send({response});
    }
    catch(err){
        return res.status(500).send({error:"Unable to scrape"});
    }
}