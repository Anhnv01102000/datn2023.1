const mongoose = require('mongoose');
require('dotenv').config()

const dbConnect = async () => {
    try {
        const connect = await mongoose.connect(process.env.DATABASE)
        if (connect.connection.readyState === 1) console.log('DB connection is successfully');
        else console.log('DB connecting');
    } catch (error) {
        console.log('DB connection is failed');
        throw new Error(error)
    }
}

module.exports = dbConnect