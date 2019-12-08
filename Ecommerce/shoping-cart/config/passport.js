var passport=require('passport');
var mongoose=require('mongoose');
const {check,validationResult} = require('express-validator');

var User=require('../models/user');

var local=require('passport-local').Strategy;


passport.serializeUser((user,done)=>{
    done(null,user.id);
});

passport.deserializeUser((id,done)=>{
    User.findById(id,(err,user)=>{
        done(err,user);
    })
})

passport.use('local.signup',new local({
    usernameField:'email',
    passwordField:'password',
    passReqToCallback:true
},(req,email,password,done)=>{

    var errors=validationResult(req);
    if(!errors.isEmpty()){
        var messages=[];
        const itr=errors.array().values();
        for(const value of itr){
           
            messages.push(value.msg);
        }
        return done(null,false,req.flash('error',messages));
    }
    User.findOne({'email':email},(err,user)=>{
        if(err){
            return done(err);
        }
        if(user){
            
            return done(null,false,{message:'Email is already in use'});
        }
        var newUser=new User();
        newUser._id=new mongoose.Types.ObjectId();
        newUser.email=email;
        newUser.password=newUser.encryptPassword(password);
        newUser.save(function(err,result){
            if(err){
                return done(err);
            }
            return done(null,newUser);
        });
    
        
    })
}
))


passport.use('local.signin',new local({
    usernameField:'email',
    passwordField:'password',
    passReqToCallback:true
},(req,email,password,done)=>{

    var errors=validationResult(req);
    if(!errors.isEmpty()){
        var messages=[];
        const itr=errors.array().values();
        for(const value of itr){
           
            messages.push(value.msg);
        }
        return done(null,false,req.flash('error',messages));
    }
    User.findOne({'email':email},(err,user)=>{
        if(err){
            return done(err);
        }
        if(!user){
            
            return done(null,false,{message:'No User Found!'});
        }
        if(!user.validPassword(password)){
            return done(null,false,{message:'Wrong Password!'});
        }
    
            return done(null,user);    
        
    })
}
))