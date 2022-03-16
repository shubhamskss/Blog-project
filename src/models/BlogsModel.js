let mongoose=require('mongoose')
let BlogsSchema=new mongoose.Schema({
title:{
    type:String,
    requird:true
},
body:{type:String,
requird:true},
authorId:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:"Author11"
},
category:{
    type:String,
    required:true
},
tags:[{type:String}],
subcategory:
    [{type:String}],
deletedAt:{
    type:Date,
    default:null
},
isDeleted:{
    type:Boolean,
    default:false
},
isPublished:{
    type:Boolean,
    default:false
},
publishedAt:{
    type:Date,
    default:Date.now()
}



},{timestamps:true})
module.exports=mongoose.model('Blog',BlogsSchema)