import express from "express";
import mongoose from "mongoose";
import cors from 'cors'
import  dotenv from 'dotenv'
import personRoutes from './routes/person.routes.js'
const KEY =function(){
    if( process.env.CONNECTION_URL===undefined){
        console.log('wrong')
        return dotenv.config().parsed.CONNECTION_URL
    }
    console.log('run')
   return  process.env.CONNECTION_URL
}()

const app = express();
const port = 5000
//const url = 'mongodb+srv://yehan:yehan1234@carcitycluster.dodfqtz.mongodb.net/CarCity?retryWrites=true&w=majority'


app.use(express.urlencoded({extended:true}));
app.use(cors())
app.use(express.json())



app.use('/person',personRoutes)



app.listen(port, () => {
    mongoose.set('strictQuery', false);
    mongoose.connect(KEY, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
        console.log('Connetect');
    })

})