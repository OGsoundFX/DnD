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
    Character.findByIdAndUpdate(id, {direction: newDirection, level: parseInt(level) + 1 }, function(err, char) {
        if (err) throw err;
    });
    setTimeout(function(){
      Character.find({ _id: id }, function(err, char) {
        if (err) throw err;
        res.render(`./story/${char[0].level}`, { char: char[0] });
      });
    }, 300);
  });

  app.post('/wolves', (req, res) => {
    let response, id;
    if (req.body[Object.keys(req.body)[0]] = "Submit") {
      response = req.body[Object.keys(req.body)[1]];
      id = Object.keys(req.body)[1];
    } else {
      response = req.body[Object.keys(req.body)[0]];
      id = Object.keys(req.body)[0];
    };

    if (response === "fight") {
      Character.find({ _id: id }, function(err, char) {
        if (err) throw err;
        res.render('./story/combatWolf', { char: char[0], wolf: 3 })
      });
    } else {
      res.send('Other answer');
    };
  });
}
