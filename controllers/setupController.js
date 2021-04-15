const Characters = require('../models/characterModel');
const Lexico = require('../models/lexicoModel');

module.exports = function(app) {

   app.get('/api/setupDB', function(req, res) {
       // seed database
       var starterCharacters = [
           {
               charactername: 'Olivier',
               magicWord: 'magic',
               weapon: 'Sword',
               meal: 'potatoes',
               direction: 'N',
               strength: 25,
               agility: 15
           }
       ];
       Characters.create(starterCharacters, function(err, results) {
           res.send(results);
       });
   });

   app.get('/api/setupLexico', (req, res) => {
    const lexico = [
           {
            name: "lexico",
            direction: ["north", "n", "south", "s", "east", "e", "west", "w"],
            attack: ["fight", "attack", "battle", "clash", "kill", "hit", "combat", "war", "engage", "hurt", "slay", "murder", "hunt", "slaughter"],
            escape: ["run", "away", "flee", "escape"]
           }
       ];
       Lexico.create(lexico, (err, results) => {
           res.send(results);
       });
   });
}
