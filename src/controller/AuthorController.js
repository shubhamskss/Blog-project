
let AuthorModel = require("../models/Authormodel")
let jwt=require('jsonwebtoken')

const BlogsModel = require("../models/BlogsModel")
const isValid=function(value){
    if(typeof value==='undefined'|| value==='null'){return false}
    if(typeof value==='string'&& value.trim().length===0){return false}
    return true
}
const isvalidTitle=function(title){
    return['mr','miss','mrs'].indexOf(title)!==-1
}
const isvalidRequestbody=function (requestBody){
    return Object.keys(requestBody).length>0
}
// const registerauthor= async function(req,res){
// try{
//     const requestBody=req.body
//     if(!isvalidRequestbody(requestBody)){
//         res.status(400).send({status:false,message:"invalid request parameter"})
//     }
//     const {firstname,lastname,email,password}=requestBody
//     if(!isValid(firstname)){res.status(400).send({status:false,message:"first name is required"})}
//     if(!isValid(lastname)){res.status(400).send({status:false,message:"last name is required"})}
//     if(!isValid(title)){res.status(400).send({status:false,message:"title is required"})}
//     if(!isvalidTitle(title)){res.status(400).send({status:false,message:"this title is not allowed"})}
//     if(!isValid(password)){res.status(400).send({status:false,message:"password is required"})
//   const isemailAlreadyUsed=await AuthorModel.findOne({email})
//     if(isemailAlreadyUsed){res.status(400).send({status:false,message:'email is already registred'})}}
    
// }catch(err){res.status(500).send({error:err.message})}}


let authOrs = async function (req, res) {
    try {
        const requestBody=req.body
    if(!isvalidRequestbody(requestBody)){
        res.status(400).send({status:false,message:"invalid request parameter"})
    }
    const {firstname,lastname,title,email,password}=requestBody
    if(!isValid(firstname)){res.status(400).send({status:false,message:"first name is required"})}
    if(!isValid(lastname)){res.status(400).send({status:false,message:"last name is required"})}
    if(!isValid(title)){res.status(400).send({status:false,message:"title is required"})}
    if(!isvalidTitle(title)){res.status(400).send({status:false,message:"this title is not allowed"})}
    if(!isValid(password)){res.status(400).send({status:false,message:"password is required"})
  const isemailAlreadyUsed=await AuthorModel.findOne({email})
    if(isemailAlreadyUsed){res.status(400).send({status:false,message:'email is already registred'})}}
    
        let data = req.body
        if (Object.keys(data).length == 0) { return res.status(400).send({ msg: "you can't send empty body" }) }
        var validateEmail = function (email) {
            var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return re.test(email)
        };
        if (!validateEmail) { return res.status(400).send({ msg: "invalid email" }) }
      
        let savedData = await AuthorModel.create(data)
        res.status(201).send({ msg: savedData })

    }
    catch (err) { res.status(500).send({ msg: err.message }) }
}
// ============================================================================================
let loginuser=async function(req,res){
    try{
        let username=req.body.email
        if(!username){return res.status(400).send("Bad request")}
       let password=req.body.password
       if(!password){return res.status(400).send("Bad request")}
        
        let savelogin=await AuthorModel.findOne({email:username,password:password})
        if(!savelogin){return res.status(404).send({msg:"user with this username and password not found"})}
        
        
let token=await jwt.sign({authorId:savelogin._id},'shubham kumar')
res.setHeader("x-api-key",token)
res.status(201).send({status:true,data:token})


    }
    catch(error){res.status(500).send({error:error.message})}
}







module.exports.authOrs = authOrs
module.exports.loginuser=loginuser