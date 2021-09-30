const express = require('express');
const morgan =require('morgan')
const cors =require('cors')

const passport = require('./lib/passport');

const sendMail=require('./routes/mailAPI')
const todoAPI=require('./routes/todoAPI')
const userAPI=require('./routes/userAPI')
const fileUploadApi = require('./routes/fileUploadApi');
const path = require('path');
const cron=require('./routes/cron')
const loginAPI=require('./routes/loginAPI')
const app = express();
const port = 3000;

const connect = require('./db/connection.js');
app.use('/api/uploads', express.static(path.join(__dirname, '/uploads')));

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.get('/', async(req,res) => {
    res.json({message: 'Welcome to my REST API.'});
});

app.use('/api',todoAPI)
app.use('/api',userAPI)
app.use('/api',sendMail)
app.use('/api', fileUploadApi);
app.use('/api', loginAPI);


app.listen(process.env.port || port, function () {
    console.log(`Backend server start on port ${port}`);
});