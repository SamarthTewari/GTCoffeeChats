const mongoose = require('mongoose')

const schema = new mongoose.Schema({ 
    weekMet: Date,
    groupMembers: { type: Array, default: [] }



})

const GroupMeeting = mongoose.model("GroupMeeting", schema)

module.exports = GroupMeeting