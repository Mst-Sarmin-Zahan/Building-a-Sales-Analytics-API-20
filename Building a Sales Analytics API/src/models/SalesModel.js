const mongoose = require("mongoose");

const DataSchema = mongoose.Schema({
    
    product:{type:String, reruired:true},  
    quantity:{type:Number, required:true},
    price: {type:Number, required:true},
    date:{type:Date,default:Date},
    department: {type: String}
  
},
{//timestamps:true,
    versionKey:false})

const SalesModel = mongoose.model('Sales', DataSchema);

module.exports = SalesModel;