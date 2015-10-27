function writeOLTP(arrData) {
  var connector = require('./connector');

  debug("Writting data into Database");
  debug(arrData);
  //connector.connect(function(err, client){
  //var insertion = client.query("INSERT...");

  //insertion.on('row',function(row, result){
  //Report when a row has been updated
  //result.addRow(row);
  //});

  //insertion.on('end',function(result){

  //});

  for(var i = 0; i < 100000000000000; i++);
  //});
}

function etl() {

}

exports.write = writeOLTP;
exports.transform = etl;
