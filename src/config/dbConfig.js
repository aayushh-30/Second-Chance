const mongoose = require('mongoose')

const connectDb = async () => {

    try {
        const connectionInstance = await mongoose.connect(process.env.DB_STRING);
        console.log('DB Connected Successfully : from dbConfig.js');
        return connectionInstance;
    } catch (error) {
        console.log('Something went Wrong while connecting to the DB : from dbConfig.js');
        throw error;
    }

}

module.exports = { connectDb }