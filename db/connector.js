var pg = require('pg'),
  config = require('connection'),
  connectionStr = "postgres://"+config.user+":"+config.password+"@"+config.host+"/"+config.database;

function connectToPG(callback){
  var client = pg.Client(connectionStr);

  client.connect(function(err){
    if(err){
      return callback(err);
    }

    callback(false, client);
  });
}

exports.connect = connectToPG;
