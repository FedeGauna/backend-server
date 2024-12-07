const mongoose = require('mongoose');
require('dotenv').config();

const dbConnection = async() => {

    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.DB_CONN_STR);     
        
        console.log('Database online.');
        

    } catch (error) {
        console.log(error);
        throw new Error('There was an error when trying to connect to the database.');
    }

};

module.exports = {
    dbConnection
}