const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const {errorHandler,notFound} = require('./middleware/errorMiddleware');
const app = express();


dotenv.config();

mongoose.connect(process.env.MONGO_URL,)
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((error) => {
    console.log('Error connecting to MongoDB : ',error);
});

const corsOption = {
    origin : process.env.CLIENT_URL,
    methods : ['GET' , 'POST' , 'PUT' , 'PATCH' , 'DELETE'] ,
    optionsSuccessStatus: 200
}

app.use(cors(corsOption));

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'../client/public'))); //access static files via url;


const authRouter = require('./routes/auth');
const quizRouter = require('./routes/quiz');
const scoreRouter = require('./routes/score');

app.use('/api/v1/auth',authRouter);
app.use('/api/v1/quiz',quizRouter);
app.use('/api/v1/score',scoreRouter);

app.use(notFound);
app.use(errorHandler);


const serverConnectionLogger = () => {
    console.log(`Server running on port ${process.env.PORT}`);
}

app.listen(process.env.PORT,serverConnectionLogger);