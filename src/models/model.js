const mongoose = require("mongoose");
const express = require("express");
const bodyparser = require('body-parser');

const studentSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
        unique : true
    },
    email:{
        type:String,
        required: true,
        unique:true
    }
})



const Register = new mongoose.model('Register', studentSchema);
module.exports = Register;
