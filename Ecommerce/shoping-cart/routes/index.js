var express = require('express');
var mongoose=require('mongoose');
var Razorpay=require('razorpay');
var router = express.Router();
var Product=require('../models/product');
var Cart=require('../models/cart');
var Order=require('../models/order');
var rzp = new Razorpay({
  key_id: 'rzp_test_omXTKXS06pl60y',
  key_secret: 'S8bnSheHtyJH1kzgzDpy2Zxr'
})

/* GET home page. */
router.get('/',(req, res, next)=> {
  var successMsg=req.flash('success')[0];
   Product.find()
   .exec()
   .then(results=>{
     var productChunks=[];
     var chunkSize=3;
     for(var i=0;i<results.length;i+=chunkSize){
       productChunks.push(results.slice(i,i+chunkSize));
     }
     res.render('shop/index',{products:productChunks,successMsg:successMsg,noMessages:!successMsg});
   })
   .catch(err=>{
     console.log(err);
   })
  });

  router.get('/category/:id',(req, res, next)=> {
    var successMsg=req.flash('success')[0];
    console.log(req.params.id);
    Product.find({category:req.params.id})
   .exec()
   .then(results=>{
     var productChunks=[];
     var chunkSize=3;
     for(var i=0;i<results.length;i+=chunkSize){
       productChunks.push(results.slice(i,i+chunkSize));
     }
     res.render('shop/index',{products:productChunks,successMsg:successMsg,noMessages:!successMsg});
   })
   .catch(err=>{
     console.log(err);
   })
    
    });

  router.get('/show/:id',(req,res,next)=>{
      var productId=req.params.id;
      Product.find({_id:productId})
      .exec()
      .then(results=>{
        var productChunks=[];
     var chunkSize=3;
     for(var i=0;i<results.length;i+=chunkSize){
       productChunks.push(results.slice(i,i+chunkSize));
     }
        res.render('shop/view',{products:productChunks});
      })
      .catch(err=>{
        console.log(err);
      })
      

  });
    

router.get('/add-to-cart/:id',(req,res,next)=>{
  var productId=req.params.id;
  var cart=new Cart(req.session.cart? req.session.cart:{});

  Product.findById(productId)
  .exec()
  .then(docs=>{
      cart.add(docs,docs._id);
      req.session.cart=cart;
      console.log(req.session.cart);
      res.redirect('/');
  })
  .catch(err=>{
    return res.redirect('/');
  })
})

router.get('/reduce/:id',(req,res,next)=>{
  var productId=req.params.id;
  var cart=new Cart(req.session.cart? req.session.cart:{});
  cart.reduceByOne(productId);
  req.session.cart=cart;
  res.redirect('/cart');
})

router.get('/remove/:id',(req,res,next)=>{
  var productId=req.params.id;
  var cart=new Cart(req.session.cart? req.session.cart:{});
  cart.removeItem(productId);
  req.session.cart=cart;
  res.redirect('/cart');
})
 
router.post('/search',(req,res,next)=>{
  var successMsg=req.flash('success')[0];
  var search=req.body.search;
  Product.find({title:{$regex:search,$options:"i"}})
  .exec()
  .then(results=>{
    var productChunks=[];
    var chunkSize=3;
    for(var i=0;i<results.length;i+=chunkSize){
      productChunks.push(results.slice(i,i+chunkSize));
    }
    res.render('shop/index',{products:productChunks,successMsg:successMsg,noMessages:!successMsg});
  })
  .catch(err=>{
    res.status(500).json({error:err})
  })

})

router.get('/cart',(req,res,next)=>{
  if(!req.session.cart){
    return res.render('shop/cart',{products:null});

  }
  var cart=new Cart(req.session.cart);
  res.render('shop/cart',{products:cart.generatedArray(),totalPrice:cart.totalPrice});
})



router.get('/checkout',isLoggedIn,(req,res,next)=>{
  if(!req.session.cart){
    return res.redirect('/cart');

  }
  var order_id;
  rzp.orders.create({
    amount:100,
    currency:'INR',
    receipt:'Purchase of Games', 
    payment_capture:true ,
  }).then((result)=>{
      order_id=result.id;
   })
  var cart=new Cart(req.session.cart);
  res.render('shop/checkout',{total:cart.totalPrice,order:order_id});
});

router.post('/checkout',isLoggedIn,(req,res,next)=>{
  var cart=new Cart(req.session.cart);

  var payid=req.body.razorpay_payment_id
  
  rzp.payments.capture(payid,100)
  .then((results=>{
    var order=new Order({
      user:req.user,
      cart:cart,
      address:req.body.address,
      name:req.body.name,
      phone:req.body.mobile,
      city:req.body.city,
      state:req.body.state,
      zipcode:req.body.zipcode,
      paymentId:payid
    });

    order.save()
    .then((result)=>{
      req.flash('success',"Your Order has been placed.Thank you!");
      req.session.cart=null;
      res.redirect('/');
    }).catch((err)=>{
      res.status(500).json({error:err})
    })
   
  }))
  

})



module.exports = router;

function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
     return next();
  }
  req.session.oldUrl=req.url;
   res.redirect('/user/signin');
}
