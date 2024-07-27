//Salary Schema

// have
// name, department, total salary

// at the time of fetch the department i select respect that staff name occur in select option and [Total($)] will save at manage salary


//Leave Schema
// this is for apply leave (not for admin)

const mongoose=require('mongoose')
const {Schema}=mongoose

const SalSchema=new Schema({
      userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'user',
      },
      StaffName:{
            type:String,
            required:true,
      },
      department:{
            type:String,
            required:true,
      },
      Paid_Salary:{
            type:String,
            required:true,
      },
      created_at:{
            type:Date,
            default:Date.now,
            immutable: true,  // This ensures the field is set once and cannot be changed

      }
})

const Salary=mongoose.model('salary',SalSchema)
module.exports=Salary
