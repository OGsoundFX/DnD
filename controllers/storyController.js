const Character = require('../models/characterModel');
const Lexico = require('../models/lexicoModel');

module.exports = function(app) {

  app.post('/update', (req, res) => {
    let level, id, newDirection;
    newDirection = req.body.direction;
    level = req.body.level;
    id = req.body.id;

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

  app.post('/wolf', (req, res) => {
    let playerResponse = req.body.response;
    let id = req.body.id;
    let level = req.body.level;
    let playerResponseArray = playerResponse.split(" ");


    Lexico.find( {name: "lexico"}, (err, lexico) => {
      if (err) throw err;
      const attackLexico = lexico[0].attack;
      const escapeLexico = lexico[0].escape;
      let nAttack = 0;
      let nEscape = 0;

      playerResponseArray.forEach(word => {
        if (attackLexico.includes(word)) {
          nAttack ++;
        } else if (escapeLexico.includes(word)) {
          nEscape ++;
        };
      });

        // res.send(nAttack);

        if (nAttack > 0) {
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
        } else if (nEscape > 0) {
          // create pack of wolves
          res.send('You coward!');
        } else {
          res.send('Other answer');
        };

    });


    // if (attackLexico.includes(word)) {
    //   // create Wolf
    //   const wolf = {
    //     life: 10 + Math.floor(Math.random()*7),
    //     strength: 8 + Math.floor(Math.random()*9),
    //     agility: 6 + Math.floor(Math.random()*7),
    //     chance: 6 + Math.floor(Math.random()*7)
    //   };
    //   Character.find({ _id: id }, function(err, char) {
    //     if (err) throw err;
    //     res.render('./story/combatWolf', { char: char[0], wolf: wolf })
    //   });
    // } else if (escapeLexico.includes(word)) {
    //   // create pack of wolves
    //   res.send('You coward!');
    // } else {
    //   res.send('Other answer');
    // };



    // if (response === "fight") {
    //   // create Wolf
    //   const wolf = {
    //     life: 10 + Math.floor(Math.random()*7),
    //     strength: 8 + Math.floor(Math.random()*9),
    //     agility: 6 + Math.floor(Math.random()*7),
    //     chance: 6 + Math.floor(Math.random()*7)
    //   };
    //   Character.find({ _id: id }, function(err, char) {
    //     if (err) throw err;
    //     res.render('./story/combatWolf', { char: char[0], wolf: wolf })
    //   });
    // } else if (response === "escape") {
    //   // create pack of wolves
    // } else {
    //   res.send('Other answer');
    // };
  });

  app.post('/updateAfterCombat', (req,res) => {
    let id = req.body["id"];
    let level = parseInt(req.body["level"]);
    let newLife = parseInt(req.body["life"]);
    let experience = parseInt(req.body["experience"]);
    Character.findByIdAndUpdate(id, {level: level + 1, life: newLife, $inc: {experience: experience}, $push: {inventory: "wolf tooth"} }, function(err, char) {
        if (err) throw err;
    });

    setTimeout(function(){
      Character.find({ _id: id }, function(err, char) {
        if (err) throw err;
        res.render(`./story/${char[0].level}`, { char: char[0] });
      });
    }, 300);
  });
}
