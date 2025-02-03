import {handleError} from '@/utils/errorHandler';
import Url from '@/models/index';
import {nanoid} from 'nanoid';

class ShortenUrlService{
    static async makeShorter(baseUrl:string){
        const shortnedId = nanoid(6);
        const newUrl = new Url({baseUrl, shortnedId})
        try {
            await newUrl.save();
            return shortnedId;    
        } catch (error) {
            handleError("error in hanlding post shortner logic"!, 500, error)
        }
    }

    static async getBase(shortnedId:string){
        try {
            const urlDoc = await Url.findOne({shortnedId})
            return urlDoc;
        } catch (error) {
            handleError("error in hanlding post shortner logic"!, 500, error)
        }
    }
}

export default ShortenUrlService;