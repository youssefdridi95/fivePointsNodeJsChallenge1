const express = require('express');
const todoAPI=require('./routes/todoAPI')
const app = express();
const port = 3000;

const connect = require('./db/connection.js');


// app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', async(req,res) => {
    res.json({message: 'Welcome to my REST API.'});
});

app.use('/api',todoAPI)


app.listen(process.env.port || port, function () {
    console.log(`Backend server start on port ${port}`);
});