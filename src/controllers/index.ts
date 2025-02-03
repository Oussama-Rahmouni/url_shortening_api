import {Request, Response, NextFunction} from 'express';
import ShortenUrlService from '@/services/index';

class ShortenUrlController{

    static async  handlePost(req:Request,res:Response,next:NextFunction){
        const {baseUrl} = req.body;
        try {
            const shortned_url = await ShortenUrlService.makeShorter(baseUrl)
            res.status(201).json({message:`${process.env.CLIENT_URL}/${shortned_url}`})
        } catch (error) {
            next(error)
        }
    }

    static async  handleGet(req:Request,res:Response,next:NextFunction): Promise<void>{
        const {shortnedId} =  req.params;
        console.log("haw shortned", shortnedId)
        try {
            const urlDoc = await ShortenUrlService.getBase(shortnedId)
            if(!urlDoc){
                return ;
            }
            const baseUrl = urlDoc.baseUrl;
            console.log("base url: ", baseUrl)
            res.status(200).json({baseUrl})
            // res.redirect(baseUrl)
        } catch (error) {
            console.log("haw leror", error)
            next(error)
        }
    }
}

export default ShortenUrlController;