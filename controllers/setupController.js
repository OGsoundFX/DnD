const Characters = require('../models/characterModel');

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
               strength: 12,
               agility: 10
           }
       ];
       Characters.create(starterCharacters, function(err, results) {
           res.send(results);
       });
   });

}
