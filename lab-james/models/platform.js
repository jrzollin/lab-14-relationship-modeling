'use strict';

const mongoose = require('mongoose');

const platformSchema = mongoose.Schema({
  name: {type: String, required: true},
  gameList: {type: mongoose.Schema.Types.ObjectId, ref: 'gameLists'},
});

module.exports = mongoose.model('platforms', platformSchema);
