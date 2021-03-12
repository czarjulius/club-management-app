const mongoose = require('mongoose');
require('dotenv/config')

const db_connection = ()=>{
    return mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })
        .then(()=>console.log('MongoDb connected!'))
        .catch(err => console.log(err))
}

module.exports = {db_connection}