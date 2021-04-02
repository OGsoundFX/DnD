const Character = require('../models/characterModel');

module.exports = function(app) {

  app.post('/save/character', (req, res) => {
      const characterResponse = Object.keys(req.body)[0].split(",");
      var newCharacter = Character({
          charactername: characterResponse[0],
          magicWord: characterResponse[1],
          weapon: characterResponse[2],
          meal: characterResponse[3]
      });
      newCharacter.save(function(err) {
          if (err) throw err;
          res.redirect('../test');
      });
  });


}
