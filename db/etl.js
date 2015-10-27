var debug = require('debug')('db:etl'),
  sqlite = require('sqlite3').verbose();

function transformDB(arrData) {
  debug("Ready to write to OLTP...");
  var db = new sqlite.Database('metropolitan.sqlite3');

  db.serialize(function() {
    var stmt = db.prepare("INSERT OR REPLACE INTO metropolitan_statistical_by_income(rank, metropolitan_statistical_area, population, median_household_income) VALUES(?,?,?,?)");

    for (var i = 0; i < arrData.length; i++) {
      stmt.run(arrData[i].id, arrData[i].area, arrData[i].population, arrData[i].median, function(err) {
        if (err) debug(err);
      });
    };

    stmt.finalize();

    db.all("SELECT * FROM metropolitan_statistical_by_income", function(err, rows) {
      var etlStmt = db.prepare("INSERT OR REPLACE INTO metropolitan_transformed(rank, population, state, area, median) VALUES(?,?,?,?,?)");

      rows.forEach(function(row, index, arr) {
        var resultObj = {},
          area = row.metropolitan_statistical_area.split(","),
          state = area[1].split(" ");

        state.shift();

        state.splice(state.length - 1, 1);

        state = state.join(" ");

        area = area[0];

        row.area = area;
        row.state = state;
        row.median = row.median_household_income;

        etlStmt.run(row.rank, row.population, row.state, row.area, row.median);
      });

      etlStmt.finalize();

      db.close();
    });
  });
}

exports.operate = transformDB;
