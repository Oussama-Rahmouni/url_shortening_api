import query from '@/config/query';
import {handleError} from '@/utils/CustomError';

class ShortenUrlService{
    static async function makeShorter(baseUrl){
        try {
            const shortned = //logic to do the shorting
            const shortnedUrl = await query(`INSERT INTO urls (baseUrl) VALUES (?)`, [baseUrl])
            return shortned ;
        } catch (error) {
            handleError("error in hanlding post shortner logic"!, 500, error.data)
        }
    }

    static async function getBase(shortned_url){
        try {
            const baseUrl = await query(`SELECT * from urls WHERE id = (?)`,[id])
            return baseUrl;
        } catch (error) {
            handleError("error in hanlding post shortner logic"!, 500, error.data)
        }
    }
}

export default ShortenUrlService;