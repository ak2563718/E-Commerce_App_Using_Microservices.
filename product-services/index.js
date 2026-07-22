import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet'
import { errorMiddleware} from './middlewares/errorMiddleware.js'
import category from './routes/all.Route.js'

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(cors())
app.use(helmet())

app.use('/api',category)
app.use(errorMiddleware)
const port = process.env.PORT;
app.listen(port,()=>{
    console.log(`server is running at port ${port}`)
})