import express, {Request, Response} from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import bodyParser from 'body-parser';

import globalErrorHandler from '@/utils/globalErrorHandler.ts';
import routes from '@/routes/index.ts'

dotenv.config()

const app = express()

app.use(cors({
    origin:process.env.CLIENT_URL,
    memthods:["POST", "GET", "OPTIONS"],
    allowedHeaders:'Content-Type, Authorizaton'
}))

app.use(bodyParser.json())
app.use(rateLimit({
    windowMs:20*60*1000,
    max:100,
}))

app.use(helmet())
app.use(morgan('dev'))

app.use('/api', routes)
app.use(globalErrorHandler)

export default app;