const mongoose = require('mongoose');

const UserTb = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name Is Required!"],
        trim:true
    },
    email:{
        type:String,
        required:[true,"Email Is Required!"],
        lowercase:true,
        unique:true,
        trim:true
    },
    mobile:{
        type:String,
        required:[true,"Mobile Is Required!"],
        trim:true
    },
    password:{
        type:String,
        required:[true,"Password Is Required!"]
    }
},
{
    timestamps:true
});

const UserSchema = mongoose.model("user",UserTb);

module.exports = UserSchema;