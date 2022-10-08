import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    text: {
        type:String,
        required:true
    },
    imageURL:String,
    tags:{
        type:Array,
        default:[]
    },
    excerpt:String,
    user: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
},
{
    timestamps:true
}) 

export default mongoose.model('Post', postSchema)