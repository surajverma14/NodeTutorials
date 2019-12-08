const passport=require('passport');
const gs=require('passport-google-oauth20');
const keys=require('./key');
const User=require('../model/user');
const mongoose=require('mongoose');


passport.serializeUser((user,done)=>{
    done(null,user.id);
});

passport.deserializeUser((id,done)=>{
    User.findById(id).exec()
    .then((user)=>{
        done(null,user);
    });
   
});

passport.use(
    new gs({
        //option for google option'
        callbackURL:'/auth/google/redirect',
        clientID:keys.google.clientID,
        clientSecret:keys.google.clientSecret
    },(accessToken,refreshToken,profile,done)=>{
            //callback
            User.findOne({googleid:profile.id}).exec()
            .then((currentUser)=>{
                if(currentUser){

                    console.log('user is',currentUser);
                    done(null,currentUser);
                }
                else{

                    new User({
                        _id:new mongoose.Types.ObjectId(),
                        username:profile.displayName,
                        googleid:profile.id,
                        thumbnail:profile._json.image.url
                    }).save()
                    .then((result)=>{
                        console.log('user Created'+result);
                        done(null,result);
                    })
            

                }
            })
           })
)

