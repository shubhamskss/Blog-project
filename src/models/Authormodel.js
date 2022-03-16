let mongoose=require('mongoose')
let authorSchema=new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:true
    },
    title:{
        type:String,
        enum:["mr","mrs","miss"],
        required:true
    },
    email:{
type:String,

    required:true,
    lowercase:true,

            unique: true,
            
            
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        
    
required:true,
minLength: 6,
maxLength: 100

    },
    password:{
        type:String,
        required:true,
        minlength:6
    }

},{timestamps:true})
module.exports=mongoose.model('Author11',authorSchema)