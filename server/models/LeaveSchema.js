//Leave Schema
// this is for apply leave (not for admin)

const mongoose=require('mongoose')
const {Schema}=mongoose

const LeaveSchema=new Schema({
      userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'user',
      },
      reason:{
            type:String,
            required:true,
      },
      start:{
            type:String,
            required:true,
      },
      end:{
            type:String,
            required:true,
      },
      description:{
            type:String,
            required:true,
      },
      created_at:{
            type:Date,
            default:Date.now,
            immutable: true,  // This ensures the field is set once and cannot be changed

      }
})

const Leave=mongoose.model('leave',LeaveSchema)
module.exports=Leave



// name,gender,phone,dob,city,country,department,email,photo,date_of_join,state,address