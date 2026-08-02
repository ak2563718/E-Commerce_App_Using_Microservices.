import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser())
app.use(cors())

const port = process.env.PORT;
app.listen(port,()=>{
    console.log(`server is running at port ${port}`)
})