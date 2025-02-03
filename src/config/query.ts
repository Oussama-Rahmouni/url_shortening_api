import { handleError } from '../utils/CustomError'
import connect from './db'

async function query(sqlQuery, values){
    try {
        const [result] = await connect.execute(sqlQuery, values)
        return result;
    } catch (error) {
        handleError("error in executing the query", 500, error.data)
    }
}