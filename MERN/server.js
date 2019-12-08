const express=require('express');
const mongoose=require('mongoose');

const items=require('./routes/api/items');
const users=require('./routes/api/users');
const auth=require('./routes/api/auth')

const app=express();

app.use(express.json());
mongoose.connect('mongodb://localhost:27017/mern',
{ useCreateIndex:true,
    useNewUrlParser: true,
    useUnifiedTopology: true}
);

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

app.use('/api/items',items);
app.use('/api/users',users);
app.use('/api/auth',auth);
const port=process.env.PORT ||5000;

app.listen(port,()=>{
    console.log(`Server started on port: ${port}`)
})