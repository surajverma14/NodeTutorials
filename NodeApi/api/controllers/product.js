const mongoose=require('mongoose');
const Order=require('../models/order');
const Product=require('../models/product');

exports.get_product_all=(req,res,next)=>{
    Product.find()
    .select("name price _id productImage")
    .exec()
    .then(docs=>{
        const response={
            count:docs.length,
            products:docs.map(doc=>{
                return{
                    name:doc.name,
                    price:doc.price,
                    _id:doc._id,
                    productImage:doc.productImage,
                    request:{
                        type:"GET",
                        url:"http://localhost:3000/product/"+doc._id
                    }
                };
            })
        }
        res.status(200).json(response);
    }).catch(err=>{console.log(err);
    res.status(500).json({error:err})
    })
 };

 exports.create_product=(req,res,next)=>{
    console.log(req.file);
    const product=new Product({
        _id:new mongoose.Types.ObjectId(),
        name:req.body.name,
        price:req.body.price,
        productImage:req.file.path

    });
    product.save()
    .then(result=>{
        console.log(result);
        res.status(201).json({
            message:"handling post Request",
            createdProduct:{
                name:result.name,
                price:result.price,
                _id:result._id,
                request:{
                    type:"POST",
                    url:"http://localhost:3000/product/"+result._id
                }
            }
        })
    }).catch(err=>{console.log(err);
        res.status(500).json({error:err})
    });
    
};

exports.get_productby_id=(req,res,next)=>{
    const id=req.params.productId;
    Product.findById(id)
    .select('name price _id productImage')
    .exec()
    .then(doc=>{
        if(doc){
        console.log(doc);
        res.status(200).json({
            product:doc,
            request:{
                type:"GET",
                url:"http://localhost:3000/product/"+id
            }
        });
        }
        else{
            res.status(404).json({message:'NOT FOUND!'})
        }
    }).catch(err=>{console.log(err);
        res.status(500).json({error:err})
    });
    };

    exports.update_productby_id=(req,res,next)=>{
        const id=req.params.productId;
        const updateOps={};
        for(const ops of req.body){
            updateOps[ops.propName]=ops.value;
        }
        Product.updateOne({_id:id},{$set:updateOps})
        .exec()
        .then(result=>{
            console.log(result);
            res.status(200).json({
                message:'Product Updated',
                request:{
                    type:"GET",
                    url:"http://localhost:3000/product/"+id
                }
            });
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({error:err})
        })
    };

    exports.delete_product=(req,res,next)=>{
        const id=req.params.productId;
        Product.remove({_id:id}).exec()
        .then(result=>{
            res.status(200).json({
                message:'Product Updated',
                request:{
                    type:"POST",
                    url:"http://localhost:3000/product/"+id,
                    data:{name:'String',price:'Number'}
                }
            })
        }).catch(err=>{
            console.log(err);
            res.status(500).json({
                error:err
            })
        })
    };

