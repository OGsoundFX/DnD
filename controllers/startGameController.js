const Character = require('../models/characterModel');

module.exports = function(app) {

  app.post('/load', (req, res) => {
    Character.find({ charactername: req.body.name, magicWord: req.body.magic }, function(err, char) {
      if (err) throw err;
      if (char[0] !== undefined) {
        // res.send(char);
        console.log("true");
        res.redirect(`../story/${char[0].level}`);
      } else {
        console.log("false");
        console.log("can't use document.querySelector here");
        console.log("redirect to new login page")
      }
    });
  });
}
