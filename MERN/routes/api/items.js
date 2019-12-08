const express=require('express');
const router=express.Router();
const auth=require('../../middleware/auth');
const Item=require('../../models/item');


router.get('/',(req,res)=>{
    Item.find()
    .exec()
    .then(items=>res.json(items))
    .catch(err=>{

    })
})


router.post('/',auth,(req,res)=>{
    const newItem=new Item({
        name:req.body.name
    })
    newItem.save()
    .then(item=>res.json(item));

})


router.delete('/:id',auth,(req,res)=>{
   Item.remove({_id:req.params.id})
   .exec()
   .then(result=>res.json({message:'success'}))
   .catch(err=>res.status(404).json({message:'Not Found'}))
})



module.exports=router;