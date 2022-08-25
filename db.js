const mongoose = require('mongoose')
const { createProduct } = require('./server/Controller')

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost/shopproject')
        console.log("Connected to DB...")
    } catch (error) {
        console.log("Failed connecting to DB...", error)
    }
}


module.exports = { connect }

