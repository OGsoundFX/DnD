const Characters = require('../models/characterModel');

module.exports = function(app) {
  app.get('/api/maxLife', function(req, res) {
    Characters.updateMany({}, {"$set":{"maxLife": 25}}, (err, results) => {
      if (err) throw err;
      res.send(results);
    });
  });
}
