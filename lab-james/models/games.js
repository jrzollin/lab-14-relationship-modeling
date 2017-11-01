'use strict';

const mongoose = require('mongoose');


const gameSchema = mongoose.schema({
  name: {type: String, required: true},
  platforms: {type: mongoose.Schema.Types.ObjectId, ref: 'platforms'},
  gameList: {type: mongoose.Schema.Types.ObjectId, ref: 'gameLists'},
});

module.exports = mongoose.model('games', gameSchema);
