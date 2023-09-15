import express from 'express'
import dotenv  from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import morgan from 'morgan';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import questionsRoutes from './routes/questions.js';
import Language from './models/Language.js';
import Question from './models/Questions.js';
import { frenchEasy, frenchMedium, spanishEasy, spanishMedium, germanEasy, germanMedium} from './data/data.js';
//import { language } from './data/data.js';

const app = express();
dotenv.config();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("common"));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.get("/", (req ,res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

app.use("/auth", authRoutes);
app.use("/questions", questionsRoutes);
app.use("/user", userRoutes);


mongoose.connect(process.env.MONGO_URL ,{
    useNewUrlParser : true, 
    useUnifiedTopology: true,
}) 
.then(() => {
    console.log('Connected to MongoDB');
    /*
        Language.insertMany(language);
        Question.insertMany(frenchEasy);
        Question.insertMany(frenchMedium);
        Question.insertMany(spanishEasy);
        Question.insertMany(spanishMedium);
        Question.insertMany(germanEasy);
        Question.insertMany(germanMedium);
    */
})
.catch((error) => { console.error('Error connecting to MongoDB:', error) });

const port = process.env.PORT || 3001;
app.listen(port, ()=> {
    console.log('socket is up and running', {port});
})