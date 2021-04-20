const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const playerEntrySchema = new Schema({
    entry: String
});

const PlayerEntries = mongoose.model('playerEntries', playerEntrySchema);

module.exports = PlayerEntries;
