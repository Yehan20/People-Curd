import mongoose from "mongoose";

//  create Schema
const PersonSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        validate:{
            validator:(v)=>v.length>1,
           
        },
        message:props=> `name must be more than ${props.value} `
    },
    emp__id:{
        type:String,
        required:true,
        
    },
    designation:{
        type:String,
        required:true,
        
    },
    type:{
        type:String,
        required:true,
        
    },
    exp:{
        type:Number,
        required:true,
        
    }

})

const personModal = mongoose.model('person',PersonSchema);

export default personModal;