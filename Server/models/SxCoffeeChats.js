const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    phoneNumber: String,
    availabeThisWeek: { type: Boolean, default: null },
    isAssignedToGroupThisWeek: { type: Boolean, default: false },
    groupNumberForThisWeek: {type: Number, default: null},
    groupForThisWeek: { type: Array, default: [] },
    partner: { type: Object, default: null },
    peopleAlreadyMet: { type: Array, default: [] },
    numberTimesLogIn: { type: Number, default: 0 }
})

const SxMember = mongoose.model("SxMember", schema)

module.exports = SxMember