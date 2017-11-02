'use strict';

const express = require('express');
const jsonParser = require('body-parser').json();
const Game = require('../models/games.js');

const gameRouter = module.exports = express.Router();

gameRouter.post('/games', jsonParser, (req, res, next) => {
  let newGame = new Game(req.body);
  newGame.save()
    .then(game => {
      res.send(game);
    })
    .catch(err => {
      next(err);
    });
});

gameRouter.get('/games', (req, res, next) => {
  Game.find({})
    .then(games => {
      res.send(games);
    })
    .catch(err => {
      next(err);
    });
});

gameRouter.get('/games/:id', (req, res, next) => {
  let id = req.params.id;
  Game.findOne({_id: id})
    .then(game => {
      res.send(game);
    })
    .catch(err => {
      next(err);
    });
});

gameRouter.delete('/games/:id', (req, res, next) => {
  let id = req.params.id;

  Game.remove({_id: id})
    .then( () => {
      res.send('Game deleted');
    })
    .catch(err => {
      next(err);
    });

});
