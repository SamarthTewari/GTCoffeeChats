const mongoose = require('mongoose')


const schema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    numberTimesLogIn: Number
})

const SxAdmin = mongoose.model("SxAdmin", schema)

module.exports = SxAdmin