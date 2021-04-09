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
      // create Wolf
      const wolf = {
        life: 10 + Math.floor(Math.random()*7),
        strength: 8 + Math.floor(Math.random()*9),
        agility: 6 + Math.floor(Math.random()*7),
        chance: 6 + Math.floor(Math.random()*7)
      };
      Character.find({ _id: id }, function(err, char) {
        if (err) throw err;
        res.render('./story/combatWolf', { char: char[0], wolf: wolf })
      });
    } else if (response === "escape") {
      // create pack of wolves
    } else {
      res.send('Other answer');
    };
  });

  app.post('/updateAfterCombat', (req,res) => {
    res.send(req.body);
    let level, id, newLife;
  });
}
