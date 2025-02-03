import mongoose from 'mongoose';
import { handleError } from '@/utils/errorHandler';
import dotenv from 'dotenv';

const MAX_RETRIES = 3;
const RETRY_DELAY = 5000;

dotenv.config()

const MONGO_URI = process.env.DB_CONNECTION || '';

const connection = async (retries= MAX_RETRIES) => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("db connected!")
    } catch (error) {
        console.log("db failed to connect!")
        if (retries > 0) {
            setTimeout(() => connection(retries - 1), RETRY_DELAY);
        } else {
            handleError('DB failed to connect after retries', 500, error);
            process.exit(1);
        }
    }
} 

export default connection;