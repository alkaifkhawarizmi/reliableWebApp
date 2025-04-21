const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AdminSchema = new Schema({
  name : {
    type : String,
    required : true,
    default : "Zarif Ahmed"
  },
  userName : {
    type : String,
    required : true,
    unique : true,
    default : "principal"
  },
  email : {
    type : String,
    required : true,
    unique : true
  },
  password : {
    type : String,
    required : true,
    default : "admin123",
    select : false
  }
})

module.exports = mongoose.model("Admin" , AdminSchema)