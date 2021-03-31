const Characters = require('../models/characterModel');

module.exports = function(app) {

   app.get('/api/setupDB', function(req, res) {
       // seed database
       var starterCharacters = [
           {
               charactername: 'Olivier',
               weapon: 'Sword'
           }
       ];
       Characters.create(starterCharacters, function(err, results) {
           res.send(results);
       });
   });

}
