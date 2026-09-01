import express from 'express';
import cors from 'cors';
import "dotenv/config";
import cookieParser from 'cookie-parser';
import { errorMiddleware } from './middleware/errorMiddleware.js'
import helmet from 'helmet'
import ShipAddress from './routes/shipping.Routes.js';
import order from './routes/order.Routes.js'
const app = express();
app.use(express.json())
app.use(cors());
app.use(cookieParser())
app.use(express.urlencoded({extended:false}));
app.use(helmet())
app.use('/api',ShipAddress)
app.use('/api',order)

app.use(errorMiddleware)
const port = process.env.PORT;
app.listen(port,()=>{
    console.log(`server is running at port ${port}`)
})