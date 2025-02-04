import express, {Request, Response, NextFunction} from 'express';
import morgan from 'morgan'; // loggin middleware in development mode
import helmet from 'helmet'; //secure http headers
import cors from 'cors';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit'; //Rate limiting middleware 
import compression from 'compression';  //compression  for responses 
import hpp from 'hpp'; //prevent http parametre from pollution

import {globalErrorHandler} from './utils/errorHandler'; //global error handler
import routes from './routes/index' //routes


dotenv.config()

const app = express()

app.use(express.json());

// security middlewares
app.use(helmet())
app.use(cors({
    origin:process.env.CLIENT_URL ,
    credentials: true,
    methods:["POST", "GET" ,"OPTIONS"],
    allowedHeaders:['Content-Type', 'Authorization', 'X-Requested-With'],
    preflightContinue:false,
    optionsSuccessStatus:200,
}))
app.use(rateLimit({
    windowMs:20*60*1000,
    max:100,
}))

app.use(hpp());
app.use(compression());
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}



app.use('/api', routes)
app.use(globalErrorHandler)

export default app;