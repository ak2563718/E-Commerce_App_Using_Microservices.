import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import { errorMiddleware } from './middleware/errorMiddleware.js';
import cart from "./routes/cart.Routes.js"
import helmet from 'helmet'

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser())
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:5000'],
    credentials:true,
}));
app.use(helmet())
app.use('/cart',cart)
app.use(errorMiddleware)
const port = process.env.PORT;
app.listen(port, ()=>{
    console.log(`server is running at port ${port}`)
})