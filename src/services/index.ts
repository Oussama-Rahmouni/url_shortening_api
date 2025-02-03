import {handleError} from '@/utils/errorHandler';
import Url from '@/models/index';
import {nanoid} from 'nanoid';


class ShortenUrlService{

    // Utility function to calculate expiration date
  private static calculateExpiration(duration: string): Date | null {
    if (!duration) return null; // No expiration

    const now = new Date();
    switch (duration) {
      case '24h':
        return new Date(now.getTime() + 24 * 60 * 60 * 1000); 
      case '48h':
        return new Date(now.getTime() + 48 * 60 * 60 * 1000); 
      case '7d':
        return new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000); 
      default:
        return null; // Invalid duration
    }
  }

    static async makeShorter(baseUrl:string, duration:any){
        const shortnedId = nanoid(6);
        const expiration = this.calculateExpiration(duration); 
        const newUrl = new Url({baseUrl, shortnedId,expiration})

        try {
            await newUrl.save();
            return newUrl;    
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

    static async verifyBase(baseUrl:string){
        try {
            const base = await Url.findOne({baseUrl})
            return base;
        } catch (error) {
            handleError("error while verifying the existin of teh url",500, error)
        }
    }
}

export default ShortenUrlService;