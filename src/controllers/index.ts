import {Request, Response, NextFunction} from 'express';
import ShortenUrlService from '@/services/index';

class ShortenUrlController{

    static async  handlePost(req:Request,res:Response,next:NextFunction){
        const {baseUrl} = req.body;
        try {
            const shortned_url = await ShortenUrlService.makeShorter(baseUrl)
            res.status(201).json({shortned_url, message:'success'})
        } catch (error) {
            next(error)
        }
    }

    static async  handleGet(req:Request,res:Response,next:NextFunction){
        const {shortned_url} =  req.body;
        try {
            const baseUrl = await ShortenUrlService.getBase(shortned_url)
            res.status(200).json({baseUrl, message:'success'})
            
        } catch (error) {
            next(error)
        }
    }
}

export default ShortenUrlController;