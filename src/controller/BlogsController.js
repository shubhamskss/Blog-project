let BlogsModel=require('../models/BlogsModel')
let Authormodel=require('../models/Authormodel')
let Blogs=async function(req,res){
    try{let data=req.body
    let authorid=data.authorId
    if(!authorid){return res.status(404).send({msg:"author not found"})}
let createblog=await BlogsModel.create(data)
res.status(201).send({msg:createblog})



}
    catch(err){res.status(500).send({msg:err.message})}
}
// ===========================================================================================
const getBlogsData=async function(req,res){

    try {
        let author_Id = req.query.authodId
        let categoryy = req.query.category
        let tags = req.query.tags
        let subCategory = req.query.subCategory
       
        let blogs = await BlogsModel.find({isdeleted : false,isPublished:true, $or:[{category:categoryy}, {authorId:author_Id},{tags: {$all:[tags]}},{subCategory: {$all:[subCategory]}}]})
        
        if (!blogs)
        return res.status(404).send({ status:false, msg: "user data not found" });
        return res.status(200).send({ status: true, msg : blogs });
    
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
            let blog = await BlogsModel.findOne({ _id: blogId, isDeleted: false })
           
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
    res.status(200).send()}
    catch(err){res.status(500).send({error:err.message})}

  }
// ==================================================================================================
let deleteBlogsqp=async function(req,res){
    
try{
    let input = req.query
        
        if(Object.keys(input).length == 0) return res.status(400).send({status: false, msg: "please provide input data" })

        let deletedBlog = await BlogsModel.updateMany({ $and: [input, { isDeleted: false }] }, { $set: { isDeleted: true, deletedAt: Date.now() } }, { new: true })
        console.log(deletedBlog)
        res.status(200).send()}
        catch(error){res.status(500).send({error:error.message})}}




module.exports.Blogs=Blogs
module.exports.getBlogsData=getBlogsData
module.exports.updateBlogs=updateBlogs
module.exports.deleteBlogs=deleteBlogs
module.exports.deleteBlogsqp=deleteBlogsqp