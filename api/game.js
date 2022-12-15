const Game = require('../controllers/gameApi');
const router = require('express').Router();

router.get('/', Game.getGames);
router.get('/all', Game.getAllGames);

module.exports = router;