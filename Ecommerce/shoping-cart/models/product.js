var mongoose=require('mongoose');

var productSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    imagePath:{type:String,required:true},
    title:{type:String,required:true},
    description:{type:String,required:true},
    price:{type:String,required:true},
    category:{type:String,required:true}
});

module.exports=mongoose.model('Product',productSchema);
