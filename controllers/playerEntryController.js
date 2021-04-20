const PlayerEntry = require('../models/playerEntryModel');

module.exports = function(app) {

  app.post('/playerEntry', (req, res) => {
      const newPlayerEntry = PlayerEntry({
          entry: "testing"
      });
      newPlayerEntry.save(function(err, char) {
          if (err) throw err;
      });
  });
}
