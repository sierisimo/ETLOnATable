var should = require('should'),
  app = require('../app');

describe("Check the URL and his content", function() {
  it("Fetcher should return a object with 'data' and 'document'. Also, data has to be <tbody>", function(done) {
    var fetcher = require('../web/fetch');

    fetcher.fetch(function(val) {
      should(val).not.be.Undefined();

      val.should.have.keys(["data", "document"]);

      val.data.should.have.property('nodeName').eql('TBODY');

      done();
    }, function(err) {
      err.should.not.be.Undefined();
      err.should.be.Error();

      done();
    });
  });
});
