import {Request, Response, NextFunction} from 'express';
import { handleError } from "../utils/errorHandler"

export const validate = async (req:Request,res:Response, next:NextFunction)=>{
    try {
        //validation logic
        next()
    } catch (error) {
        handleError("validation was not passed!", 500, error)
    }
}
