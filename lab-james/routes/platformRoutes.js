'use strict';

const express = require('express');
const jsonParser = require('body-parser').json();
const Platform = require('../models/platform.js');

const platformRouter = module.exports = express.Router();

platformRouter.post('/platforms', jsonParser, (req, res, next) => {
  let newPlatform = new Platform(req.body);

  newPlatform.save()
    .then(platform => {
      res.send(platform);
    })
    .catch(err => {
      next(err);
    });
});

platformRouter.get('/platforms', (req, res, next) => {
  Platform.find({})
    .then(platforms => {
      res.send(platforms);
    })
    .catch(err => {
      next(err);
    });
});

platformRouter.get('/platforms/:id', (req, res, next) => {
  let id = req.params.id;

  Platform.findOne({_id: id})
    .then(platform => {
      res.send(platform);
    })
    .catch(err => {
      next(err);
    });
});

platformRouter.delete('/platforms/:id', (req, res, next) => {
  let id = req.params.id;

  Platform.remove({_id: id})
    .then( () => {
      res.send('Platform deleted');
    })
    .catch(err => {
      next(err);
    });
});
