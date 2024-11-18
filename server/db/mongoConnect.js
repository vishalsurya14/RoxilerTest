const mongoose = require('mongoose');
// const mongoURI = process.env.MONGO_URI;
mongoURI="mongodb://localhost:27017/transactions"
const mongoConnect = () => {
    
    mongoose.connect(mongoURI)

    mongoose.connection.on('connected', () => {
        console.log('Connected to MongoDB');
    })

    mongoose.connection.on('error', (err) => {
        console.log('Error while connecting to MongoDB:', err);
    })

    mongoose.connection.on('disconnected', () => {
        console.log('Disconnected from MongoDB');
    })

}

module.exports = mongoConnect;