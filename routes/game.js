const router = require('express').Router();
const Game = require('../controllers/game');

router.get('/', Game.renderMainView);
router.get('/add', Game.renderAddGame);
router.post('/add', Game.addGame);
router.get('/edit/:id', Game.renderEditGame);
router.post('/edit/:id', Game.editGame);
router.get('/delete/:id', Game.deleteGame);

module.exports = router;