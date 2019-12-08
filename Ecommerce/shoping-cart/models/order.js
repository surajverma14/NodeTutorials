var mongoose=require('mongoose');

var orderSchema=mongoose.Schema({
   user:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
   cart:{type:Object,required:true},
   address:{type:String,required:true},
   name:{type:String,required:true},
   phone:{type:Number,required:true},
   city:{type:String,required:true},
   state:{type:String,required:true},
   zipcode:{type:Number,required:true},
   paymentId:{type:String,required:true}
   
});

module.exports=mongoose.model('Order',orderSchema);
