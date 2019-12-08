var mongoose=require('mongoose');

var userSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    username:{type:String,required:true},
    googleid:{type:String,required:true},
    thumbnail:{type:String}
});
module.exports=mongoose.model('User',userSchema);

