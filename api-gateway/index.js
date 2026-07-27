import express from 'express';
import "dotenv/config";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import axios from 'axios'

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors({
    origin:['http://localhost:3000','http://localhost:6001']
}));
app.use(cookieParser())

app.use('/auth',async(req, res)=>{
    const response = await axios({
        method:req.method,
        url:`${process.env.AUTH_URL}${req.originalUrl}`,
        data:req.body,
        headers:{
            'Content-Type':'application/json'
        },
        params:req.query,
    })
    res.status(response.status).json(response.data);
})

const port = process.env.PORT;
app.listen(port, ()=>{
    console.log(`server is running at port ${port}`)
})