import express from 'express';
import "dotenv/config";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import Proxy from './routes/api.Routes.js'


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors({
    origin:['http://localhost:3000','http://localhost:6001'],
    credentials:true,
}));
app.use(cookieParser())
app.use('/api',Proxy)

const port = process.env.PORT;
app.listen(port, ()=>{
    console.log(`server is running at port ${port}`)
})