const express=require('express');
const route=require('./routes/auth');
const profile=require('./routes/profile');
const coookieSession=require('cookie-session');
const passportSetup=require('./config/passport-setup');
const mongoose=require('mongoose');
const passport=require('passport');

const app=express();

app.set('view engine','ejs');

app.use(coookieSession({
    maxAge:24*60*60*1000,
    keys:['passportlogin']
}))

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect('mongodb://localhost:27017/passport',
{ useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true}
);


app.use('/auth',route);
app.use('/profile',profile);

app.get('/',(req,res)=>{
    res.render('home',{user:req.user});
})
app.listen(3000,()=>{
    console.log("server running")
})