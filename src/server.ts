import 'module-alias/register';
import app from "@/app";
import dotenv from 'dotenv';
import connection from './config/db';

dotenv.config()

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server running on port:${PORT}`)
    connection()
    }
)