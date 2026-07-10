import express from 'express';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { errorMiddleware } from './middleware/errorMiddleware.js'
import auth from './routes/auth.Routes.js'
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(cors({
    origin:'http://localhost:6000',
    credentials:true,
}));
app.use('/auth',auth)
app.use(errorMiddleware);
const port = process.env.PORT;
app.listen(port, ()=>{
    console.log(`server is running at port ${port}`)
})
