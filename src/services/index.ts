import {handleError} from '@/utils/errorHandler';

class ShortenUrlService{
    static async makeShorter(baseUrl:string){
        try {
            // const shortned = //logic to do the shorting
            // return shortned ;
        } catch (error) {
            handleError("error in hanlding post shortner logic"!, 500, error)
        }
    }

    static async getBase(shortned_url:string){
        try {
            // return baseUrl;
        } catch (error) {
            handleError("error in hanlding post shortner logic"!, 500, error)
        }
    }
}

export default ShortenUrlService;