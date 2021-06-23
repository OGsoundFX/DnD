const Character = require('../models/characterModel');
const ObjectId = require('mongodb').ObjectID;

module.exports = function(app) {

  app.post('/character', (req, res) => {
      const characterResponse = Object.keys(req.body)[0].split(",");
      const number = Math.floor(Math.random() * 11);
      const newCharacter = Character({
          charactername: characterResponse[0],
          magicWord: characterResponse[1],
          weapon: characterResponse[2],
          meal: characterResponse[3],
          level: 2,
          strength: 20 + number,
          agility: 20 - number,
          maxLife: 25
      });
      newCharacter.save(function(err, char) {
          if (err) throw err;
          const id = ObjectId(newCharacter._id).toString();
          Character.find({ _id: id }, function(err, char) {
            if (err) throw err;
            res.render(`./story/forest`, { char: char[0] });
          });
      });
  });
}
