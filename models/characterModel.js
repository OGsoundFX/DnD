const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const characterSchema = new Schema({
    charactername: String,
    weapon: String
});

const Characters = mongoose.model('Characters', characterSchema);

module.exports = Characters;
