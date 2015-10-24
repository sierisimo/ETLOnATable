var debug = require('debug')('parser');

function parseTable(dataObj) {
  var trArr = dataObj.data.getElementsByTagName('TR'),
    tdArr = [];

  for (var i = 0; i < trArr.length; i++) {
    tdArr.push(trArr.item(i).getElementsByTagName('TD'));
  }
  
  //FIXME: Strange, the first element is a NodeList with null elements...
  tdArr.shift();

  tdArr.forEach(function(element, index, arr) {
    tdArr[index] = {
      id: Number.parseInt(element.item(0).textContent),
      area: element.item(1).textContent,
      population: Number.parseInt(element.item(2).textContent.split(',').join('')),
      median: Number.parseInt(element.item(3).textContent.split('$')[1].split(',').join(''))
    };
  });

  dataObj.window.close();

  delete dataObj.data;
  delete dataObj.document;
  delete dataObj.window;

  return tdArr;
}

exports.parseTable = parseTable;
