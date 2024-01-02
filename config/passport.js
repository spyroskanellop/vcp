var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/User');
var passport = require('passport');

var opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secretOrPrivateKey';

console.log("Inside passport");

passport.use( new JwtStrategy(opts, function(jwt_payload, done) {
    
    User.findOne({ where: { id: jwt_payload.id } })
    .then(user => {
        // if(err){
        //     return done(err, false);
        // }
        if(user){
            return done(null, user);
        } else {
            return done(null, false);
        }
    })
    .catch(error => {
        console.error(error);
        return done(error, false);
        // return res.json({ "message": "User not found", "status": 404 });

    });




}));