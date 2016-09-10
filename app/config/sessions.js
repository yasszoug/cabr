var User             = require('../models/user.js');
var FacebookStrategy = require('passport-facebook').Strategy;

var facebook = new FacebookStrategy({
  clientID: parseInt(process.env.FACEBOOK_CLIENT_ID) || 1473890396254055,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET || '01f981ccb0e2ab427017f8fa01707155',
  callbackURL: global.root + 'loginsuccess'
}, function(accessToken, refreshToken, profile, done){
  User.findOrCreate(profile).then(function(user){
    done(null, user);
  }, function(err){
    console.log(err);
    done(null, false);
  });
});

module.exports = function(passport){
  passport.serializeUser(function(user, done) {
    done(null, user.get('uid'));
  });

  passport.deserializeUser(function(id, done) {
    User.find(id).then(function(user){
      user ? done(null, user) : done(null, false);
    });
  });

  passport.use(facebook);
};