const mongoose = require('mongoose')


const schema = new mongoose.Schema({

    editorName: String,
    editorId: String,
    
})

const EditHistory = mongoose.model("EditHistory", schema)

module.exports = EditHistory