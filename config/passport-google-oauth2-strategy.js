const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');

const User = require('../models/user');

//We need to tell passport to use new(google) strategy for google login
passport.use(new googleStrategy({
        clientID: "424653189352-fupvjl4h6gqn890vo49gvon0ijh7ae32.apps.googleusercontent.com",
        clientSecret: "lMx1tEXH9v88a6vSYxjHb1mR",
        callbackURL: "http://localhost:8000/users/auth/google/callback",
    },
    //This is a callback function
    function(accessToken, refreshToken, profile, done){
        User.findOne({email: profile.emails[0].value}).exec(function(err,user){
            if(err){
                console.log('error in google strategy-passport', err);
                return;
            }

            console.log(profile);

            if(user){
                //If found then set this user as req.user
                return done(null,user);
            }
            else{

                //If not found, create this user and set it as req.user
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password : crypto.randomBytes(20).toString('hex')
                }, function(err,user){
                    if(err){
                        console.log('error in creating user google strategy-passport', err);
                        return;
                    }

                    return done(null,user);
                });
            }
        });   
    }

));

module.exports = passport;
