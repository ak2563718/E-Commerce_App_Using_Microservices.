import nodemailer from 'nodemailer';
import 'dotenv/config'

const transport = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.EMAIL,
        pass:process.env.PASSWORD,
    }
})

export default transport;