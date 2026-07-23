import express from 'express';
import cors from 'cors';
import "dotenv/config";
import cookieParser from 'cookie-parser';
import { errorMiddleware } from './middleware/errorMiddleware.js'
const app = express();

app.use(express.json())
app.use(cors());
app.use(cookieParser())
app.use(express.urlencoded({extended:false}));

app.use(errorMiddleware)
const port = process.env.PORT;
app.listen(port,()=>{
    console.log(`server is running at port ${port}`)
})