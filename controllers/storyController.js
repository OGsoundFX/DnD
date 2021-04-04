const Character = require('../models/characterModel');
const fs = require('fs');

module.exports = function(app) {

  app.post('/update', (req, res) => {
    let level, id, newDirection;

    if (req.body[Object.keys(req.body)[0]] = "Submit") {
      level = Object.keys(req.body)[0];
      id = Object.keys(req.body)[1];
      newDirection = req.body[Object.keys(req.body)[1]];
    } else {
      level = Object.keys(req.body)[1];
      id = Object.keys(req.body)[0];
      newDirection = req.body[Object.keys(req.body)[0]];
    };

    Character.findByIdAndUpdate(id, {direction: newDirection, level: level + 1 }, function(err, char) {
        if (err) throw err;
    });

    Character.find({ _id: id }, function(err, char) {
      if (err) throw err;
      res.render(`./story/${char[0].level}`, { char: char });
    });
  });
}
