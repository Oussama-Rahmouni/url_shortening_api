import express, {Request, Response, NextFunction} from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import compression from 'compression';
import hpp from 'hpp';
// import csurf from 'csurf';
// import coockieParser from 'cookie-parser';

import {globalErrorHandler} from '@/utils/errorHandler';
import routes from '@/routes/index'

dotenv.config()

const app = express()

app.use(express.json());

// security middlewares
app.use(helmet())
app.use(cors({
    origin:"*",
    methods:["POST", "GET", "OPTIONS"],
    allowedHeaders:'Content-Type, Authorizaton'
}))
app.use(rateLimit({
    windowMs:20*60*1000,
    max:100,
}))

// app.use(cookieParser());
// app.use(csurf({cookie:true}))
app.use(hpp());
app.use(compression());
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

app.use('/api', routes)
app.use(globalErrorHandler)

export default app;