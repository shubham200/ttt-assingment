const mongoose = require("mongoose");

const rollno = mongoose.Schema({
 rollno:{
     type:String,
 },
 status:{
     type:String
 }
});

module.exports = mongoose.model("rollno", rollno);
