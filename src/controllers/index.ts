import {Request, Response} from 'express';
import ShortenUrlService from '../services';

class ShortenUrlController{

    static async function handlePost(req:Request,res:Response,next){
        const {baseUrl} = req.body;
        try {
            const shortned_url = await ShortenUrlService.makeShorter(baseUrl)
            res.status(201).json({shortned_url:shortned_url, message:'success'})
        } catch (error) {
            next(error)
        }
    }

    static async function handlePost(req:Request,res:Response,next){
        const {shortned_url} =  req.body;
        try {
            const shortned_url = await ShortenUrlService.getBase(shortned_url)
            res.status(200).json({shortned_url:shortned_url, message:'success'})
            
        } catch (error) {
            next(error)
        }
    }
}

export default ShortenUrlController;