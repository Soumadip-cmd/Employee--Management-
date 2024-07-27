const mongoose = require('mongoose');

const mongoUrl = process.env.MONGO_URL;

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoUrl);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

module.exports = connectToMongo;
