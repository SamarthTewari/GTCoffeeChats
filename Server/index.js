const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const SxMember = require('./models/SxCoffeeChats');
const SxAdmin = require('./models/SxAdmin');
const EditHistory = require('./models/EditHistory');
const GroupMeeting = require('./models/GroupMeetings')
const bcrypt = require('bcrypt');
const nodeMailer = require('nodemailer');
const cron = require('node-cron');



const app = express()
app.use(express.json())
app.use(cors())
require('dotenv').config();
const mongoPassword = process.env.MONGO_PASSWORD;

mongoose.connect(`mongodb+srv://samarthtewari:${mongoPassword}@devcluster.a1z3qsb.mongodb.net/?retryWrites=true&w=majority&appName=DevCluster`)

async function hashPassword(password) { // returns hashed password I assume
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
}
async function comparePassword(password, hashedPassword) { // returns boolean
    return await bcrypt.compare(password, hashedPassword);
}
async function updateAllDocuments(update) {
    try {
        console.log("reached Update All documents")
        const documents = await SxMember.find();
        await Promise.all(documents.map(async (document) => { // promise.all to make it non-blocking and make code be faster
            const updatedDocument = await SxMember.findByIdAndUpdate(document._id, update, { new: true });
            if (!updatedDocument) {
                console.log(`Failed to update document with ID ${document._id}`);
            } else {
                console.log(`Updated document with ID ${document._id}`);
            }
        }));
        console.log('Update operation applied to all documents successfully');
    } catch (error) {
        console.error('Error updating documents:', error);
    }
}

/* re-sets values every sunday night, or whenever we want them too be updated.
cron.schedule('59 23 * * 0', () => { 
    const update = {
        availabeThisWeek: null,
        isAssignedToGroupThisWeek: false,
        groupNumberForThisWeek: null,
        groupForThisWeek: []
    };
    updateAllDocuments(update)
    console.log('Running event every Sunday night in New York time zone');
}, {
    timezone: 'America/New_York'
});
*/




/*
app.post('/sendOtpEmail', async (req, res) => {
    const { email, OTP } = req.body;
    console.log(req.body)
    try {
        const transporter = nodeMailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'sxoppsteam@gmail.com',
                pass: 'oppsHaveOpps'
            }
        });
        const info = await transporter.sendMail({
            from: 'sxoppsteam@gmail.com',
            to: email,
            subject: 'One Time Passcode',
            html: OTP
        });
        res.status(200).send('OTP email sent successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error sending OTP email');
    }
});*/

app.post('/addGroupMeeting', async(req,res) => {
    try{
        const today = new Date();
        const nearestSunday = new Date(today);
        const daysUntilPreviousSunday = today.getDay();
        nearestSunday.setDate(today.getDate() - daysUntilPreviousSunday);
        const meeting = {
            weekMet: nearestSunday,
            groupMembers: req.body.groupMembers
        };
        const result = GroupMeeting.create(meeting)
        res.json(result)
    }
    catch(err){
        res.json(err)
    }
    
})

app.get('/getAllMeetings', async(req,res) => {
    try {
        const allMeetings = await GroupMeeting.find();
        
        if (!allMeetings) {
            return res.status(404).json({ error: 'No members found' });
        }
        res.json(allMeetings);
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
})

app.patch('/updateGroups', async(req,res) => {
    const update = req.body; // Object Passed to request

    try {
        // There is only one document in the collection
        const existingResource = await SxMember.findOne();
        if (!existingResource) {
            return res.status(404).json({ message: 'Resource not found' });
        }
        // Update the existing document
        const updatedResource = await SxMember.findByIdAndUpdate(existingResource._id, update, { new: true });
        res.json(updatedResource);
    } catch(err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/getAllMembers', async (req, res) => {
    try {
        const allMembers = await SxMember.find();
        
        if (!allMembers) {
            return res.status(404).json({ error: 'No members found' });
        }
        
        res.json(allMembers);
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/checkPassword', async(req,res) => {
    const { email, password } = req.query;
    try{
        const user = await SxMember.findOne({ email: email });
        const match = await comparePassword(password,user.password)
        res.json({ match })
    }
    catch(err){
        res.json(err)
    }

})

app.get('/getMember', async (req,res) => { // should decrpty here
    const {email} = req.query
    try{
        const user = await SxMember.findOne({ email: email });
        res.json(user)
    }
    catch(err){
        res.json(err)
    }
})
app.get('/getMemberByPrefix', async (req, res) => {
    const { name } = req.query; 
    try {
        const regex = new RegExp('^' + name);
        const members = await SxMember.find({ name: regex });
        res.json(members);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/getAdmin', async (req,res) => {
    const {email} = req.query
    try{
        const admin = await SxAdmin.findOne({ email: email });
        res.json(admin)
    }
    catch(err){
        res.json(err)
    }
})

app.get('/getMemberById/:id', async(req,res) =>{ 
    const id = req.params.id
    try{
        const user = await SxMember.findOne({_id: id})
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user)
    }
    catch(err){
        res.json(err)
    }
})

app.post('/signUpMember', async (req, res) => { 
    try {
        const userData = {
            name: req.body.name,
            email: req.body.email,
            password: await hashPassword(req.body.password),
            phoneNumber: req.body.phoneNumber,
        };
        const sxMemb = await SxMember.create(userData);
        res.json(sxMemb);
    } catch (err) {
        res.json(err);
    }
});


app.patch('/updateData/:id', async(req,res) => {
    
    const id = req.params.id
    const update = req.body /* this is the js object we passed in in request*/
    try{
        const updatedResource = await SxMember.findByIdAndUpdate(id, update, { new: true });
        if (!updatedResource) {
            return res.status(404).json({ message: 'Resource not found' });
        }
        res.json(updatedResource)
    }
    catch(err){
        res.json(err)
    }
})




app.listen(3001, () => {
    console.log("server is running")
})