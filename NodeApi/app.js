const express=require('express');
const bodyParser=require('body-parser')
const mongoose=require('mongoose');
const app=express();
var path=require('path');
mongoose.connect('mongodb://localhost:27017/nodeapi',
{ useNewUrlParser: true,
    useUnifiedTopology: true}
);


const productRoutes=require('./api/routes/product');
const orderRoutes=require('./api/routes/order');
const userRoutes=require("./api/routes/user");

app.use('/uploads',express.static('uploads'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use((req,res,next)=>{
    res.header('Allow-Control-Allow-Origin','*');
    res.header('Alllow-Control-Allow-Headers',
    'Origin, X-Requested-With,Content-Type,Accept,Authorization');
    if(req.method=="OPTIONS"){
        res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({})
    }
    next();
});

app.use('/product',productRoutes);
app.use('/order',orderRoutes);
app.use("/user",userRoutes);

app.use((req,res,next)=>{
    const error=new Error('Not Found!');
    error.status=404;
    next(error);

})

app.use((error,req,res,next)=>{
    res.status(error.status||500);
    res.json({
        error:{
            message:error.message
        }
    })
})



module.exports=app;