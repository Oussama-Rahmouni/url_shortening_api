import { Request, Response, NextFunction } from 'express';

const isValidUrl = (url: string): boolean => {
  const regex = /^(https?:\/\/)?([a-z0-9]+[.]){1,}[a-z]{2,6}(\/\S*)?$/i;
  return regex.test(url);
};

const validatePost = async (req: Request, res: Response, next: NextFunction):Promise<void> => {
  try {
    console.log("haw body", req.body.baseUrl)
    const {baseUrl} = req.body;
    if (!baseUrl) {
      res.status(400).json({message:"url no there"})
      return; 
    }

    if (!isValidUrl(baseUrl)) {
      res.status(400).json({message:"url no there"})
      return; 

    }

    next(); // Proceed if the URL is valid
  } catch (error) {
    res.status(500).json({message:"Validation failed", error});
  }
};

export default validatePost;