const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const characterSchema = new Schema({
    charactername: String,
    magicWord: String,
    weapon: String,
    meal: String,
    direction: { type: String, default: "N" },
    level: { type: Number, default: 0 },
    strength: Number,
    agility: Number,
    chance: { type: Number, default: 0 },
    courage: { type: Number, default: 0 },
    life: { type: Number, default: 25 }
});

const Characters = mongoose.model('characters', characterSchema);

module.exports = Characters;
