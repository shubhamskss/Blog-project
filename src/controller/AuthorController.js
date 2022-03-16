
let AuthorModel = require("../models/Authormodel")
let jwt=require('jsonwebtoken')

const BlogsModel = require("../models/BlogsModel")

let authOrs = async function (req, res) {
    try {
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
        let password=req.body.password
    
        
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