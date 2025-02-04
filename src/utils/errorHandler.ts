import {Request, Response, NextFunction} from 'express';

// Custom error handler Class
class CustomError extends Error{
    public status:number;
    public data:any;

    constructor(message:string, status:number, data:any =null){
        super(message)
        this.status=status;
        this.data = data;
    }
}


// Custom error handler Class
const globalErrorHandler = (err:CustomError, req:Request, res:Response, next:NextFunction)=>{
    const status = err.status || 500;
    const message = err.message || 'problem within the server!';
    const data = err.data || null;

    res.status(status).json({message,data})
}

const handleError = (message:string, status:number, data:any = null)=>{
    return new CustomError(message, status, data)
}

export {CustomError, globalErrorHandler, handleError}