import { Request, Response, NextFunction } from 'express';

const isValidUrl = (url: string): boolean => {
  const regex = /^(https?:\/\/)?([\w-]+\.)+[a-zA-Z]{2,7}(\/[^\s]*)?$/i;
  return regex.test(url);
};


const validatePost = async (req: Request, res: Response, next: NextFunction):Promise<void> => {
  try {
    const {baseUrl} = req.body;
    if (!baseUrl) {
      res.status(400).json({message:"url no there"})
      return; 
    }

    if (!isValidUrl(baseUrl)) {
      res.status(400).json({message:"url not verified"})
      return; 

    }

    next(); // Proceed if the URL is valid
  } catch (error) {
    res.status(500).json({message:"Validation failed", error});
  }
};

export default validatePost;