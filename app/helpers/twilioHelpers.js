var client = require('twilio')('ACd3b9a7866cc2b7d491ea69c24d28c227', '35d2bb4d5ad4e0222840a6e29f24d0b2');
var Q      = require('q');

module.exports.sendMessage = function(number, message){
  var deferred = Q.defer();
  client.sendMessage({
    to: number, // replace with number of rider
    from: '+14157670797', // our twilio number (trial number)
    body: message // message
  }, function(err, responseData) { //this function is executed when a response is received from Twilio
    if (err) {
      deferred.reject(err);
    } else {
      console.log(responseData.from, responseData.body);
      deferred.resolve(responseData);
    }
  });
  return deferred.promise;
};