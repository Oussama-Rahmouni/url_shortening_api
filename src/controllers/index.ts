import {Request, Response, NextFunction} from 'express';
import ShortenUrlService from '../services/index'; // Service Methods and Logic
import csvParser from 'csv-parser'; // CSV Parser
import fs from 'fs'; //File system


class ShortenUrlController {
    
  static async handlePost(req: Request, res: Response, next: NextFunction) {
    const { baseUrl, expiration } = req.body;
    try {
      // Check if the URL already exists in the database
      const verifyExist = await ShortenUrlService.verifyBase(baseUrl);
      if (verifyExist?.baseUrl) {
        const shortnedId = verifyExist.shortnedId;
        const expiration = verifyExist.expiration;
        res.status(200).json({ message: "URL already exists. Would you like to see it?", shortnedId, expiration, special: true });
        return;
      }

      // Shorten the URL and return the shortened ID
      const newUrl = await ShortenUrlService.makeShorter(baseUrl, expiration);
      const shortnedId = newUrl?.shortnedId;
      const edxpiration = newUrl?.expiration;
      res.status(201).json({ shortnedId, expiration: edxpiration });
    } catch (error) {
      next(error);
    }
  }

      // Handle GET request to get the original URL by shortened ID
    static async  handleGet(req:Request,res:Response,next:NextFunction): Promise<void>{
        const {shortnedId} =  req.params;
        try {
            const urlDoc = await ShortenUrlService.getBase(shortnedId)
            console.log("haw l url doc", urlDoc)
            if(!urlDoc || urlDoc === undefined){
                res.status(400).json({message:"Shortned ID do not exist"})
                return ;
            }
            const baseUrl = urlDoc.baseUrl;
            res.status(200).json({baseUrl})
        } catch (error) {
            next(error)
        }
    }

      // Handle CSV file upload and bulk URL shortening
    static async bulkUpload(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { expiration } = req.body;
        const filePath = req.file?.path;

        if (!filePath) {
            res.status(400).json({ message: 'No file uploaded' });
            return; 
        }

        const results: { baseUrl: string }[] = [];

        // Read the CSV file and parse it
        fs.createReadStream(filePath)
            .pipe(csvParser())
            .on('data', (data) => results.push(data))
            .on('end', async () => {
                try {
                    // Process each URL in the CSV to shorten it
                    const shortenedUrls = await Promise.all(
                        results.map(async (row) => {
                            // Verify if some of the urls already been shorted
                            const base = await ShortenUrlService.verifyBase(row.baseUrl)
                            if(base){
                                return { baseUrl: row.baseUrl, shortenedId: base.shortnedId, expiration:base.expiration }
                            }
                            const shortenedId = await ShortenUrlService.makeShorter(row.baseUrl, expiration);
                            return { baseUrl: row.baseUrl, shortenedId:shortenedId?.shortnedId, expiration:shortenedId?.expiration };
                        })
                    );
                    res.status(201).json({ shortenedUrls });
                } catch (error) {
                    res.status(500).json({ message: 'Error processing bulk URLs', error });
                } finally {
                    fs.unlinkSync(filePath); // Delete the uploaded file after processing
                }
            });
    }
}

export default ShortenUrlController;



   

