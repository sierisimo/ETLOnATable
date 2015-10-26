var should = require('should');

var valueFromFetcher;

describe("Check the URL and his content", function() {
  it("Fetcher should return a object with 'data' and 'document'. Also, data has to be <tbody>", function(done) {
    var fetcher = require('../web/fetch');

    fetcher.fetch(function(val) {
      should(val).not.be.Undefined();

      val.should.have.keys(['data', 'document', 'window']);

      val.data.should.have.property('nodeName').eql('TBODY');

      val.window.close();

      valueFromFetcher = val;

      done();
    }, function(err) {
      err.should.not.be.Undefined();
      err.should.be.Error();

      done(err);
    });
  });
});

describe("Parse the HTML from the table", function() {
  it("Parse the data and return it as Array of JSON", function() {
    should(valueFromFetcher).not.be.Undefined();
  });
});
