const Game = require('../controllers/game');
const router = require('express').Router();

router.get('/', Game.getGames);

module.exports = router;