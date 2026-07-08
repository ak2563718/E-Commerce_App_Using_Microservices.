import express from 'express';
import "dotenv/config";
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();


const port = process.env.PORT;
app.listen(port, ()=>{
    console.log(`server is running at port ${port}`)
})