const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
const mongoose = require('mongoose');

  

async function connectDatabase() {
    try {
        const db = await mongoose.connect(`mongodb+srv://${process.env.NEW_USER}:${process.env.PASSWORD}@cluster0.pnpsdhv.mongodb.net/e-comm`);
        console.log('Connected to the database');
    } catch (error) {
        console.error('Error connecting to the database 1:', error);
        throw error
    }
}

module.exports = connectDatabase;