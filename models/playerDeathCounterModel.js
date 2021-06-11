const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const playerDeath = new Schema({
  name: String,
  hide: { type: Number, default: 0 },
  sleep: { type: Number, default: 0 },
  combat: { type: Number, default: 0 },
  climb: { type: Number, default: 0 },
  complete: { type: Number, default: 0 }
});

const playerChoices = mongoose.model('playerchoices', playerDeath);

module.exports = playerChoices;
