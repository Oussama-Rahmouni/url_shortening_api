import { Request, Response, NextFunction } from 'express';

// Function to check if a URL is valid
const isValidUrl = (url: string): boolean => {
  const regex = /^(https?:\/\/)([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}(\S*)$/i;
  return regex.test(url);
};

// Middleware to validate POST requests for URL shortening
const validatePost = async (req: Request, res: Response, next: NextFunction):Promise<void> => {
  try {
    const {baseUrl} = req.body;
    if (!baseUrl) {
      res.status(400).json({message:"no Url recieved!"})
      return; 
    }

    if (!isValidUrl(baseUrl)) {
      res.status(400).json({message:"URL not valid"})
      return; 

    }

    next(); 
  } catch (error) {
    res.status(500).json({message:"Validation failed", error});
  }
};

// Middleware to validate GET requests for shortened URLs
const validateGet = async (req: Request, res: Response, next: NextFunction):Promise<void> => {
  try {
    const {shortnedId} = req.params;
    console.log(req.params)
    console.log(shortnedId)
    if (!shortnedId || shortnedId.length === 0) {
      res.status(400).json({ message: 'Shortened ID can only contain alphanumeric character sfd.' });
      return;
    }


    // const strShorten = 
    if (shortnedId.length !== 6) {
      res.status(400).json({message:"Shortned ID do not exist"})
      return; 
    }

    next(); 
  } catch (error) {
    console.log("err", error)
    res.status(500).json({message:"Validation failed", error});
  }
};


export  {validatePost, validateGet};