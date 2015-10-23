var should = require('should'),
    app = require('../app');

describe("The app should exist", function(){
  it("Should be a non-null or non-undefined object", function(){
    should(app).not.be.Undefined();
  });
});

/*
(function() {
    var should = require("should"),
      plus = require("../plus");

    describe("This is just a test", function() {
        it("2 plus 3 should equals 5", function() {
          plus(2, 3).should.be.exactly(5).and.be.a.Number;
        });
    });
}).call(this);
*/
