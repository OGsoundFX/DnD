const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const lexicoSchema = new Schema({
    name: String,
    direction: Array,
    attack: Array,
    escape: Array
});

const Lexico = mongoose.model('lexico', lexicoSchema);

module.exports = Lexico;
