import express from 'express'
import dotenv  from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';

import authRoutes from './routes/auth.js';
import Language from './models/Language.js';
//import { language } from './data/data.js';

const app = express();
dotenv.config();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.get("/", (req ,res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

app.use("/auth", authRoutes);


mongoose.connect(process.env.MONGO_URL ,{
    useNewUrlParser : true, 
    useUnifiedTopology: true,
}) 
.then(() => {
    console.log('Connected to MongoDB');
//    Language.insertMany(language);
})
.catch((error) => { console.error('Error connecting to MongoDB:', error) });

const port = process.env.PORT || 3001;
app.listen(port, ()=> {
    console.log('socket is up and running', {port});
})