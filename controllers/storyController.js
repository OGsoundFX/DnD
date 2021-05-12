const Character = require('../models/characterModel');
const PlayerEntry = require('../models/playerEntryModel');
const Lexico = require('../models/lexicoModel');

module.exports = function(app) {

  app.get('/scoreboard', (req, res) => {
    Character.find( function(err, characters) {
      if (err) throw err;
      characterHash = {};
      characters.forEach((char) => {
        characterHash[char.charactername] = char.experience;
      });

      sortedList = Object.entries(characterHash).sort((a,b)=>{
            if(b[1] > a[1]) return 1;
            else if(b[1] < a[1]) return -1;
      //if values are same do edition checking if keys are in the right order
            else {
               if(a[0] > b[0]) return 1;
               else if(a[0] < b[0]) return -1;
               else return 0
        }
      })
      const firstTen = sortedList.slice(0,10);
      res.render('./scoreboard', { list: firstTen });
    });
  });

  app.post('/pathForest', (req, res) => {
    const life = parseInt(req.body.life);
    const food = parseInt(req.body.food);

    let level, id, direction;
    direction = req.body.direction.toLowerCase();
    level = req.body.level;
    id = req.body.id;

    Character.findByIdAndUpdate(id, { life: life, food: food }, function(err, char) {
      if (err) throw err;
    });

    const forestArray = ["woods", "forest", "bush", "tree", "wood", "woodland", "nature", "hide", "discrete", "branch", "branches"];
    const pathArray = ["path", "pathway", "road", "route", "roadway", "trail", "open", "space"];

    const replyArray = direction.split(" ");

    if (replyArray.some( word => pathArray.indexOf(word) >= 0)) {
      Character.findByIdAndUpdate(id, { level: 1, $inc: {courage: 2}  }, function(err, char) {
          if (err) throw err;
      });
      setTimeout(function(){
        Character.find({ _id: id }, function(err, char) {
          if (err) throw err;
          res.render(`./story/1`, { char: char[0] });
        });
      }, 300);
    } else if (replyArray.some( word => forestArray.indexOf(word) >= 0)) {
      Character.findByIdAndUpdate(id, { level: 1 }, function(err, char) {
          if (err) throw err;
      });

      setTimeout(function(){
        Character.find({ _id: id }, function(err, char) {
          if (err) throw err;
          res.render('./story/forest', { char: char[0] });
        });
      }, 300);
    } else {
      // saving entry into DB
      const newPlayerEntry = PlayerEntry({
          entry: req.body.direction
      });
      newPlayerEntry.save(function(err, char) {
          if (err) throw err;
      });
      // res.send(`what the fuck is ${direction}?`);

      setTimeout(function(){
        Character.find({ _id: id }, function(err, char) {
          if (err) throw err;
          res.render('./story/0', { fail: true, char: char[0] });
        });
      }, 300);
    };
  });

  // app.post('/update', (req, res) => {
  //   let level, id, newDirection;
  //   newDirection = req.body.direction;
  //   level = req.body.level;
  //   id = req.body.id;

  //   Character.findByIdAndUpdate(id, {direction: newDirection, $inc: {level: 1} }, function(err, char) {
  //       if (err) throw err;
  //   });
  //   setTimeout(function(){
  //     Character.find({ _id: id }, function(err, char) {
  //       if (err) throw err;
  //       res.render(`./story/${char[0].level}`, { char: char[0] });
  //     });
  //   }, 300);
  // });

  app.post('/bandits', (req, res) => {
    res.send("implement fight with bandits or not");
  });

  app.post('/wolf', (req, res) => {
    let playerResponse = req.body.response.toLowerCase();
    let playerResponseArray = playerResponse.split(" ");
    let id = req.body.id;
    let level = req.body.level;

    Lexico.find( {name: "lexico"}, (err, lexico) => {
      if (err) throw err;
      const attackLexico = lexico[0].attack;
      const escapeLexico = lexico[0].escape;
      const hideLexico = lexico[0].hide;
      const climbLexico = lexico[0].climb;
      let nAttack = 0;
      let nEscape = 0;
      let nHide = 0;
      let nClimb = 0;

      playerResponseArray.forEach(word => {
        if (attackLexico.includes(word)) {
          nAttack ++;
        } else if (escapeLexico.includes(word)) {
          nEscape ++;
        } else if (hideLexico.includes(word)) {
          nHide ++;
        } else if (climbLexico.includes(word)) {
          nClimb ++;
        };
      });

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
        // you try to escape but you stumble on a tronc and you get caught by a pack of wolves
        // minus points un courage
        // create pack of wolves
        res.send('You coward!');
      } else if (nHide > 0) {
        // you hide but the wolves smell your sent and attack you
        // minus points in courage
        res.send('You coward! your are attacked while hiding');
      } else if (nClimb > 0) {
        // you climb and maybe there is something cool happening / or you fall and get attacked
        // minus points in courage ?
        // extra points in luck
        // You climb a tree, and fall accidently killing the wolf (wolves)
        res.send('Climbing is a coward move but not such a bad idea');
      } else {
        Character.find({ _id: id }, function(err, char) {
          if (err) throw err;
          res.render('./story/forest', { fail: true, char: char[0] });
        });
      };

    });
  });

  app.post('/updateAfterCombat', (req,res) => {
    let id = req.body["id"];
    let level = parseInt(req.body["level"]);
    let newLife = parseInt(req.body["life"]);
    let experiencePoints = parseInt(req.body["experience"]);
    Character.findByIdAndUpdate(id, { level: 2, life: newLife, $push: {inventory: "wolf tooth"}, $inc: {food: 1, experience: experiencePoints} }, function(err, char) {
      if (err) throw err;
    });

    setTimeout(function(){
      Character.find({ _id: id }, function(err, char) {
        if (err) throw err;
        res.render(`./story/${char[0].level}`, { char: char[0] });
      });
    }, 300);
  });

  app.post('/forestDispatch', (req, res) => {
    const id = req.body["id"];

    // updating food and life if player ate
    const life = parseInt(req.body.life);
    const food = parseInt(req.body.food);

    Character.findByIdAndUpdate(id, { life: life, food: food }, function(err, char) {
      if (err) throw err;
    });

    setTimeout(function() {
      Character.find({ _id: id }, function(err, char) {
        if (err) throw err;
        let n = (Math.random() * 15);
        if (n > 13) {
          // create Wolf
          const wolf = {
            life: 10 + Math.floor(Math.random()*7),
            strength: 8 + Math.floor(Math.random()*9),
            agility: 6 + Math.floor(Math.random()*7),
            chance: 6 + Math.floor(Math.random()*7)
          };
          res.render('./story/combatWolf', { char: char[0], wolf: wolf })
        } else if (n > 10) {
          res.render(`./story/strawberryField`, { char: char[0] });
        } else if (n > 5) {
          res.render(`./story/key`, { char: char[0] });
        } else {
          res.render(`./story/2`, { char: char[0] });
        };
      });
    }, 300);
  });

  app.post('/strawberryField', (req, res) => {
    let playerResponse = req.body.entry.toLowerCase();
    let playerResponseArray = playerResponse.split(" ");
    let id = req.body.id;

    // updating food and life if player ate
    const life = parseInt(req.body.life);
    const food = parseInt(req.body.food);

    Character.findByIdAndUpdate(id, { life: life, food: food }, function(err, char) {
      if (err) throw err;
    });

    // the timeout function is imporant because the mongoDB functions
    // are asynchroneous and we need the action to perform in a specific order
    setTimeout(function() {
      Lexico.find( {name: "lexico"}, (err, lexico) => {
        if (err) throw err;
        const pickLexico = lexico[0].pick;
        const restLexico = lexico[0].rest;
        const leaveLexico = lexico[0].walk;
        let nPick = 0;
        let nRest = 0;
        let nLeave = 0;

        playerResponseArray.forEach(word => {
          if (pickLexico.includes(word)) {
            nPick ++;
          } else if (restLexico.includes(word)) {
            nRest ++;
          } else if (leaveLexico.includes(word)) {
            nLeave ++;
          };
        });

        if (nPick > 0) {

          for (let step = 0; step < 5; step++) {
            Character.findByIdAndUpdate(id, { $push: {inventory: "strawberry"} }, function(err, char) {
              if (err) throw err;
            });
          }

          setTimeout(function() {
            Character.find({ _id: id }, function(err, char) {
              if (err) throw err;
              res.render('./story/2', { char: char[0], strawberry :true })
            });
          }, 300);

        } else if (nRest > 0) {
          Character.find({ _id: id }, function(err, char) {
            if (err) throw err;
            res.render('./story/strawberryPlayerDead');
          });
        } else if (nLeave > 0) {
          Character.find({ _id: id }, function(err, char) {
            if (err) throw err;
            res.render('./story/2', { char: char[0] })
          });
        } else {
          Character.find({ _id: id }, function(err, char) {
            if (err) throw err;
            res.render('./story/strawberryField', { fail: true, char: char[0] });
          });
        };
      });
    }, 300);
  });
}
