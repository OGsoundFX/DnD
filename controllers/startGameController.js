const Character = require('../models/characterModel');

module.exports = function(app) {

  app.post('/load', (req, res) => {
    Character.find({ charactername: req.body.name, magicWord: req.body.magic }, function(err, char) {
      if (err) throw err;
      if (char[0] !== undefined) {
        res.render(`./story/${char[0].level}`, { char: char[0] });
      } else {
        res.render('./startgame', { fail: true });
      }
    });
  });
}
