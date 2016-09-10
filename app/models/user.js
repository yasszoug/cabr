var Q  = require('q');
var DB = require('../db/init.js');

var User = DB.Model.extend({
  tableName: 'users',
});

var create = function(profile){
  return new User({
    uid: profile.id,
    first_name: profile._json.first_name,
    last_name: profile._json.last_name,
    name: profile.displayName
  }).save();
};

module.exports.findOrCreate = function(profile){
  var deferred = Q.defer();
  module.exports.find(profile.id).then(function(user){
    deferred.resolve(user);
  }, function(){
    console.log('failed to find user', profile.displayName);
    create(profile).then(function(user){
      deferred.resolve(user);
    }, function(err){
      deferred.reject(err);
    });
  });
  return deferred.promise;
};

module.exports.update = function(uid, attrs){
  var deferred = Q.defer();
  DB.knex('users').where('uid', '=', uid).update(attrs)
  .then(function(success){
    success ? deferred.resolve() : deferred.reject();
  })
  return deferred.promise;
};

module.exports.find = function(uid) {
  var deferred = Q.defer();
  new User({uid: uid}).fetch().then(function(user){
    if(user){
      deferred.resolve(user);
    } else {
      deferred.reject(user);
    }
  });
  return deferred.promise;
};
