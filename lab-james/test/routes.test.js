'use strict';

const superagent = require('superagent');
const server = require('../lib/server.js');
const Game = require('../models/games.js');
const Platform = require('../models/platform.js');
const GameList = require('../models/gameList.js');

describe('Games and Platforms tests', function(){

  beforeAll( () => {
    server.start();
    return Platform.remove({});
  });

  beforeAll( () => {
    return   Game.remove({});
  });

  beforeAll( () => {
    return GameList.remove({});
  });

  afterAll( () => {
    server.stop();
  });

  let platformId;

  describe('platform creation', function(){

    test('should successfully create a new platform', function(){
      return superagent.post('http://localhost:3000/platforms')
        .set('content-type', 'application/json')
        .send({
          name: 'Nintendo',
        })
        .then(res => {
          let text = JSON.parse(res.text);
          platformId = text._id;
          expect(res.status).toEqual(200);
          expect(text.name).toEqual('Nintendo');
          expect(text._id).not.toBe(null);
          expect(text.gameList).not.toBe(null);
        });
    });

  });

  describe('game creation', function(){

    test('should successfully create a new game', function(){
      return superagent.post('http://localhost:3000/games')
        .set('content-type', 'application/json')
        .send({
          name: 'Mario',
          platforms: platformId,
        })
        .then(res => {
          let text = JSON.parse(res.text);
          console.log(text);
          expect(res.status).toEqual(200);
          expect(text.name).toEqual('Mario');
          expect(text.platforms).toEqual(platformId);
          expect(text.gameList).not.toBe(null);
          expect(text._id).not.toBe(null);
        });
    });

  });

});
