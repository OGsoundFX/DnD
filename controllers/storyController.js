const Character = require('../models/characterModel');
const fs = require('fs');

module.exports = function(app) {

  app.post('/update', (req, res) => {
    // res.send(Object.keys(req.body)[0]);
    const id = Object.keys(req.body)[0];
    const newDirection = req.body;
    let newLevel

    console.log(typeof(newDirection));
    // res.send(req.body[id]);
    Character.find({ _id: id }, function(err, char) {
      if (err) throw err;

      // newLevel = char[0].level += 1;
      // res.send(char[0]);
      // console.log(char[0].direction);
      // res.render(`./story/${char[0].level}`, { char: char });
    });

    Character.findByIdAndUpdate(id, {direction: "S", level: 1 }, function(err, char) {
        if (err) throw err;


    });

    Character.find({ _id: id }, function(err, char) {
      if (err) throw err;
      res.render(`./story/${char[0].level}`, { char: char });
      // newLevel = char[0].level += 1;
      // res.send(char[0]);
      // console.log(char[0].direction);
      // res.render(`./story/${char[0].level}`, { char: char });
    });


  });
}





