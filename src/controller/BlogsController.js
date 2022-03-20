let BlogsModel=require('../models/BlogsModel')
let Authormodel=require('../models/Authormodel')
let jwt=require('jsonwebtoken')
const { default: mongoose } = require('mongoose')
const isValid=function(value){
    if(typeof value==='undefined'|| value==='null'){return false}
    if(typeof value==='string'&& value.trim().length===0){return false}
    return true
}

const isvalidRequestbody=function (requestBody){
    return Object.keys(requestBody).length>0
}
const isvalidObjectId=function(objectId){
    return mongoose.Types.ObjectId.isValid(objectId)
}
// const registerauthor= async function(req,res){
// try{
//     const requestBody=req.body
//     if(!isvalidRequestbody(requestBody)){
//         res.status(400).send({status:false,message:"invalid request parameter"})
//     }
//     const {firstname,lastname,password}=requestBody
//     if(!isValid(firstname)){res.status(400).send({status:false,message:"first name is required"})}
//     if(!isValid(lastname)){res.status(400).send({status:false,message:"last name is required"})}
//     if(!isValid(title)){res.status(400).send({status:false,message:"title is required"})}
//     if(!isvalidTitle(title)){res.status(400).send({status:false,message:"this title is not allowed"})}
//     if(!isValid(password)){res.status(400).send({status:false,message:"password is required"})
//    }
    
// }catch(err){res.status(500).send({error:err.message})}}






let Blogs=async function(req,res){
    try{let data=req.body
    let authorid=data.authorId
    const requestBody=req.body
    if(!isvalidRequestbody(requestBody)){
        res.status(400).send({status:false,message:"invalid request parameter"})
    }
    const {title,body,category}=requestBody
    if(!isValid(category)){res.status(400).send({status:false,message:"category is required"})}
    if(!isValid(body)){res.status(400).send({status:false,message:"body is required"})}
    if(!isValid(title)){res.status(400).send({status:false,message:"title is required"})}
    

    if(!authorid){return res.status(404).send({msg:"author not found"})}
let createblog=await BlogsModel.create(data)
res.status(201).send({msg:createblog})



}
    catch(err){res.status(500).send({msg:err.message})}
}
// ===========================================================================================
const getBlogsData=async function(req,res){

    try {
        const filterquery={isDeleted:false,deletedat:null,isPublished:true}
        const queryparams=req.query
        if(isvalidRequestbody(queryparams)){
            const{authorId,category,tags,subcategory}=queryparams
            if(isValid(authorId)&&isvalidObjectId(authorId)){
                filterquery.authorId=authorId
            }
            if(isValid(category)){
                filterquery.category=category.trim()
            }
            if(isValid(tags)){
                const tagsarr=tags.trim().split(',').map(tags=>tags.trim())
                filterquery.tags={$all:tagsarr}
            }
            if(isValid(subcategory)){
                const subcatarr=subcategory.trim().split(',').map(subcat=>subcat.trim())
                filterquery.subcategory={$all:subcatarr}
            }
        }
        const blogs=await BlogsModel.find(filterquery)
        if(Array.isArray(blogs)&&blogs.length==0){res.status(400).send({status:false,message:"No blog found"})}
    res.status(200).send({status:true,data:blogs})
      } catch (Error) {
        res.status(500).send({ msg: "error", error: Error.message })
      }}
// =============================================================================================
const updateBlogs = async function (req, res) {
    
        try {
        
            let title=req.body.title
            let body= req.body.body
            let tags=req.body.tags
            let subcategory=req.body.subcategory
            let blogId = req.params.blogId
            if(!isvalidObjectId(blogId)){return res.status(400).send({msg:"in valid blogid"})}
            let blog = await BlogsModel.findOne({ _id: blogId, isDeleted: false })
            if(isDeleted=true){res.status(400).send("allready deleted")}
           
            let allblog = await BlogsModel.findOneAndUpdate(
                { _id: blogId, isDeleted: false },
                { $set: { title: title, body: body, isPublished: true, publishedAt: Date.now() }, $push: { tags: tags, subcategory: subcategory } },
                { new: true })
    
    
            res.status(200).send({ msg: allblog })  
            
    
            
            if (!blog) {
                res.status(404).send({ msg: "no blog found" })
            }
        } catch (err) {
            console.log(err)
            res.status(500).send({ msg: err.message })
        }
    }

    // =====================================================================================================

let deleteBlogs=async function(req,res){
  try{  let blogId=req.params.blogId
    let validblogId=await BlogsModel.find({_id:blogId})
    if(!validblogId){return res.status(400).send({msg:"Blog not found"})}
    let deletdblog=await BlogsModel.findOneAndUpdate({_id:blogId},{isDeleted:true,deletedAt:Date.now()},{new:true})
    console.log(deletdblog)
    if(isDeleted=true){res.status(400).send("allready deleted")}
    res.status(200).send()}
    catch(err){res.status(500).send({error:err.message})}

  }
// ==================================================================================================
let deleteBlogsqp=async function(req,res){
    
try{
    let input = req.query
    let token=req.headers["x-api-key"]
    if(!token){return res.status(404).send({status:false,msg:"token required"})}
    let decodetoken=jwt.verify(token,'shubham kumar')
    if(!decodetoken){return res.status(401).send({status:false,msg:"you are not authenticated"})}
        req.headers.BlogId=decodetoken.authorId
        if(Object.keys(input).length == 0) return res.status(400).send({status: false, msg: "please provide input data" })

        let deletedBlog = await BlogsModel.updateMany({ $and: [input, { isDeleted: false }] }, { $set: { isDeleted:true, deletedAt: Date.now() } }, { new: true })
        
        res.status(200).send(deletedBlog)}
        catch(error){res.status(500).send({error:error.message})}}




module.exports.Blogs=Blogs
module.exports.getBlogsData=getBlogsData
module.exports.updateBlogs=updateBlogs
module.exports.deleteBlogs=deleteBlogs
module.exports.deleteBlogsqp=deleteBlogsqp