import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { errorMiddleware } from './middlewares/error.Middleware.js'
import userRoutes from './routes/user.Route.js'
const app = express();
app.use(express.json());
app.use(express.urlencoded({extends:false}));
app.use(cookieParser());
app.use(cors({
    origin: ['http://localhost:3000','http://localhost:6001'],
    credentials:true,
}))

app.use('/profile',userRoutes)
app.use(errorMiddleware)
const port = process.env.PORT;
app.listen(port,()=>{
    console.log(`server is running at port ${port}`)
})