require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const UserTb = require('./models/UserSchema');

mongoose.connect(process.env.mongod_url)
.then(() => console.log("connection successfully!"))
.catch(() => console.log("connection failed!"))

//add/api
app.post('/add/api',async(req,res) => {
    const {name,email,mobile,password} = req.body;

    if(!name || !email || !mobile || !password){
        return res.status(400).json({flag:0,msg:"All Data Required!"});
    }

    try{
        const existEmail = await UserTb.findOne({email});

        if(existEmail){
            return res.status(409).json({flag:0,msg:"Email Is Already Exists!"});
        }

        const hashPassword = await bcrypt.hash(password,10);

        await UserTb.create({
            name,
            email,
            mobile,
            password:hashPassword
        });

        return res.status(201).json({flag:1,msg:"Record Add Successfully!"});

    }catch(err){
        console.log(err.message);
        return res.status(500).json({flag:0,msg:"Internal Server Problem!"})
    }
})

//display
app.get('/display/api',async(req,res) => {
    try{
        const user = await UserTb.find();

        if(user.length === 0){
            return res.status(404).json({flag:0,msg:"No Record Found!"});
        }

        return res.status(200).json({flag:1,data:user});
        
    }catch(err){
        console.log(err.message);
        return res.status(500).json({flag:0,msg:"Internal Server Problem!"});
    }
})

//fetch
app.get('/fetch/api/:id',async(req,res) => {
    try{
        const data = await UserTb.findById(req.params.id);

        if(!data){
            return res.status(404).json({flag:0,msg:"No Record Found!"})
        }

        return res.status(200).json({flag:1,data:data});

    }catch(err){
        console.log(err.message);
        return res.status(500).json({flag:0,msg:"Internal Server Problem!"})
    }
})

//update
app.put('/update/api/:id',async(req,res) => {
    const {name,email,mobile,password} = req.body;

    if(!name || !email || !mobile || !password){
        return res.status(400).json({flag:0,msg:"All Data Required!"});
    }

    try{
        const existEmail = await UserTb.findOne({
            email,
            _id:{$ne:req.params.id}
        });

        if(existEmail){
            return res.status(409).json({flag:0,msg:"Email Is Already Exists!"});
        }

        const hashPassword = await bcrypt.hash(password,10);
        
        const updateUser = await UserTb.findByIdAndUpdate(req.params.id,{name,email,mobile,password:hashPassword},{new:true});

        if(!updateUser){
            return res.status(404).json({flag:0,msg:"User Not Found!"});
        }

        return res.status(200).json({flag:1,msg:"User Updated Successfully!",data:updateUser});

    }catch(err){
        console.log(err.message);
        return res.status(500).json({flag:0,msg:"Internal Server Problem!"})
    }
})

//delete
app.delete('/delete/api/:id',async(req,res) => {
    try{
        const deleteUser = await UserTb.findByIdAndDelete(req.params.id);

        if(!deleteUser){
            return res.status(404).json({flag:0,msg:"User Not Found!"});
        }

        return res.status(200).json({flag:1,msg:"User Deleted Successfully!"});

    }catch(err){
        console.log(err.message);
        return res.status(500).json({flag:0,msg:"Internal Server Problem!"})
    }
})

app.get('/',(req,res) => {
    res.send("Hello From Backend!")
})

app.listen(port,() => {
    console.log(`The Server Is Running On PORT ${port}`)
})