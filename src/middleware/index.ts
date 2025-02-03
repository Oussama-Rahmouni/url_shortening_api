import { handleError } from "../utils/CustomError"

export const validate = async (req:Request,res:Response, next){
    try {
        //validation logic
        next()
    } catch (error) {
        handleError("validation was not passed!", 500)
    }
}
