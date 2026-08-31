import express from 'express';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { errorMiddleware } from './middleware/errorMiddleware.js'
import auth from './routes/auth.Routes.js'
import { apiLimiter } from './config/rateLimiting.js';
import helmet from 'helmet'
const app = express();
app.use(apiLimiter);
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(cors({
    origin:['http://localhost:5000','http://localhost:3000'],
    credentials:true,
}));
app.use(helmet())
app.use('/api/auth',auth)
app.use(errorMiddleware);
const port = process.env.PORT;
app.listen(port, ()=>{
    console.log(`server is running at port ${port}`)
})
