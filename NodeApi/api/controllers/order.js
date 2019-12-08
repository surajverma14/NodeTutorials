const mongoose=require('mongoose');
const Order=require('../models/order');
const Product=require('../models/product');

exports.order_get_all=(req,res,next)=>{
    Order.find()
    .select('product quantity _id')
    .populate('product','name')
    .exec()
    .then(docs=>{
        res.status(200).json({
            count:docs.length,
            orders:docs.map(doc=>{
                return {
                    _id:doc._id,
                    product:doc.product,
                    quantity:doc.quantity,
                    request:{
                        type:"GET",
                        url:'http://localhost:3000/order/'+doc._id
                    }
                }
            })
 
        })
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
 };

 exports.create_order=(req,res,next)=>{
    const order=new Order({
        _id:mongoose.Types.ObjectId(),
        quantity:req.body.quantity,
        product:req.body.productId
    });

    order.save()
    .then(result=>{
        res.status(201).json({
            message:'Order Stored',
            createdOrder:{
                _id:result._id,
                product:result.productId,
                quantity:result.quantity,
                request:{
                    type:"GET",
                    url:'http://localhost:3000/order/'+result._id
                }
            }
        });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({error:err});
    });
};

exports.order_get_order=(req,res,next)=>{
    Order.findById(req.params.orderId)
    .populate('product')
    .exec()
    .then(order=>{
        if(!order){
            return res.status(404).json({
                message:"NOT FOUND"
            })
        }
        res.status(200).json({
            order:order,
            request:{
                type:"GET",
                url:'http://localhost:3000/order'
            }
        })
        
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })    
};

exports.delete_order=(req,res,next)=>{
    Order.remove({_id:req.params.orderId})
    .exec()
    .then(result=>{
        res.status(200).json({
            message:'Ordere Deleted',
            request:{
                type:'POST',
                url:'http://localhost:3000/order/',
                data:{productId:'ID',quantity:'Number'}
            }
        })
    })
    
};