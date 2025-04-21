const mongoose = require('mongoose')
const Schema = mongoose.Schema

const mediaSchema = new Schema({

  title : {
    type : String
  },

  mediaType : {
    type : String,
    required : true,
    enum : ['banner' , 'gallery' , 'event'],
    default : 'AllMedia'
  },

  imageUrl : {
    type : String,
    required : true,
  },

  publicId : {
    type : String
  },

  uploadedAt : {
    type : Date,
    default : Date.now
  }

})

module.exports = mongoose.model("Media" , mediaSchema)