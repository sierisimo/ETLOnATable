var jsdom = require("jsdom"),
  debugConstructor = require("debug"),
  debug = debugConstructor("fetcher"),
  wikiUrl = "https://en.wikipedia.org/wiki/Highest-income_metropolitan_statistical_areas_in_the_United_States";

function fetchTable(resolve, reject) {
  jsdom.env({
    url: wikiUrl,
    done: function(err, window) {
      if (err) {
        debug("Error happend fetching web");
        reject(err);
      } else {
        var document = window.document;
        debug(document);
      }
    }
  });
}

exports.fetch = fetchTable;
