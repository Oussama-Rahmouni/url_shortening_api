import mongoose from 'mongoose';
import { handleError } from '@/utils/errorHandler';
import dotenv from 'dotenv';

dotenv.config()

const MONGO_URI = process.env.DB_CONNECTION || '';

const connection = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("db connected!")
    } catch (error) {
        console.log("db failed to connect!")
        handleError('db faild to connect', 500, error)
        process.exit(1);
    }
} 

export default connection;