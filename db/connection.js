const mongoose = require('mongoose');

const options = {
    useNewUrlParser: true,
};

const connect = mongoose.connect('mongodb://localhost:27017/database', options).then((success) => {
        console.log("=> Successfully connection to database")
    }).catch((error) => {
         console.log("=> Connect with error") 
    });

module.exports = connect;